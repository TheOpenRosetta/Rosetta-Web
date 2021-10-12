const aliases = (prefix = `src`) => ({
  '@components': `${prefix}/components`,
  '@forms': `${prefix}/components/Forms`,
  '@assets': `${prefix}/assets`,
  '@config': `${prefix}/config`,
  '@styles': `${prefix}/styles`,
  '@utils': `${prefix}/utils`,
  '@containers': `${prefix}/containers`,
  '@services': `${prefix}/services`,
});

module.exports = aliases;
