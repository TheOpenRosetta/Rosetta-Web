const aliases = (prefix = `src`) => ({
  '@components': `${prefix}/components`,
  '@forms': `${prefix}/components/Forms`,
  '@assets': `${prefix}/assets`,
  '@config': `${prefix}/config`,
  '@styles': `${prefix}/styles`,
  '@utils': `${prefix}/utils`,
  '@containers': `${prefix}/containers`,
  '@features': `${prefix}/features`,
});

module.exports = aliases;
