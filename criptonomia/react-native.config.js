// react-native.config.js
module.exports = {
    dependencies: {
      'some-unsupported-package': {
        platforms: {
          android: null, // disabilitar na plataforma Android, outras plataformas ainda utilizaram o autolink se fornecido.
        },
      },
    },
  };