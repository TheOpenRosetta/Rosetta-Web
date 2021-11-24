import React, { useEffect, useCallback, useRef } from 'react';
import {
  PdfLoader,
  PdfHighlighter,
  Highlight,
  Popup,
  AreaHighlight,
} from "react-pdf-highlighter";
import Button from '@components/Button';
import Loader from '@components/Loader';
import { Link } from "react-router-dom";

import { useSelector } from 'react-redux';
import {
  selectUser
} from '@services/Auth/authSlice';

import styles from './PDFViewer.module.scss';
import Tip from './Tip';

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

const resetHash = () => {
  document.location.hash = "";
};

const HighlightPopup = ({ comment }) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.text}
    </div>
  ) : null;

const PDFViewer = ({ url, highlights = [], setHighlights, setPreviewError }) => {
  const author = useSelector(selectUser);
  const pdfHighlighter = useRef(null)

  const scrollToHighlightFromHash = useCallback(() => {
    const getHighlightById = (id) => highlights.find((item) => item.id === id);
    const curHighlight = getHighlightById(parseIdFromHash());

    if (curHighlight) {
      pdfHighlighter.current.scrollTo(curHighlight);
    }
  }, [highlights]);

  useEffect(() => {
    window.addEventListener(
      "hashchange",
      scrollToHighlightFromHash,
      false
    );
    return () => {
      window.removeEventListener(
        "hashchange",
        scrollToHighlightFromHash,
        false
      );
    }
  }, [scrollToHighlightFromHash]);

  const addHighlight = (highlight) => {
    const date = new Date();
    setHighlights([{ ...highlight, id: getNextId(), date: date.getTime(), author }, ...highlights]);
  }

  const updateHighlight = (highlightId, position, content) => {
    const date = new Date();
    setHighlights(highlights.map((h) => {
      const {
        id,
        position: originalPosition,
        content: originalContent,
        ...rest
      } = h;
      return id === highlightId
        ? {
            id,
            date: date.getTime(),
            position: { ...originalPosition, ...position },
            content: { ...originalContent, ...content },
            author,
            ...rest,
          }
        : h;
    }));
  }

  const errorMessage = (
    <>
      <div className={styles.errorMessage}>Sorry, this paper is not publicly available, the paper can be accessed from the following link.</div>
      <Button element={Link} target="_blank" rel="noreferrer" to={{ pathname: url }} size="lg" kind="fill" classes={styles.errorMessageLink}>Go to paper</Button>
    </>
  )

  if (!url) {
    return <>
      <div className={styles.errorMessage}>Sorry. We don't have link to document.</div>
    </>
  }

  return <>
    <PdfLoader url={url} beforeLoad={<Loader/>} errorMessage={errorMessage} onError={() => setPreviewError(true)}>
      {(pdfDocument) => (
        <PdfHighlighter
          pdfDocument={pdfDocument}
          enableAreaSelection={(event) => event.altKey}
          onScrollChange={resetHash}
          ref={pdfHighlighter}
          scrollRef={() => {}}
          onSelectionFinished={(
            position,
            content,
            hideTipAndSelection,
            transformSelection
          ) => (
            <Tip
              onOpen={transformSelection}
              onConfirm={(comment) => {
                addHighlight({ content, position, comment });
                hideTipAndSelection();
              }}
            />
          )}
          highlightTransform={(
            highlight,
            index,
            setTip,
            hideTip,
            viewportToScaled,
            screenshot,
            isScrolledTo
          ) => {
            const isTextHighlight = !Boolean(
              highlight.content && highlight.content.image
            );

            const component = isTextHighlight ? (
              <Highlight
                isScrolledTo={isScrolledTo}
                position={highlight.position}
                comment={highlight.comment}
              />
            ) : (
              <AreaHighlight
                isScrolledTo={isScrolledTo}
                highlight={highlight}
                onChange={(boundingRect) => {
                  updateHighlight(
                    highlight.id,
                    { boundingRect: viewportToScaled(boundingRect) },
                    { image: screenshot(boundingRect) }
                  );
                }}
              />
            );

            return (
              <Popup
                popupContent={<HighlightPopup {...highlight} />}
                onMouseOver={(popupContent) =>
                  setTip(highlight, (highlight) => popupContent)
                }
                onMouseOut={hideTip}
                key={index}
                children={component}
              />
            );
          }}
          highlights={highlights}
        />
      )}
    </PdfLoader>
  </>
};

export default PDFViewer;
