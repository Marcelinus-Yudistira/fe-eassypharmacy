module.exports = {
  // Spesifikasi modul yang akan diuji
  moduleFileExtensions: ['js', 'json', 'vue'],
  // Transformasi yang diperlukan untuk file-file Vue
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },
  // Direktori yang akan diabaikan saat pengujian
  testPathIgnorePatterns: ['/node_modules/'],
  // Direktori yang akan diuji
  testMatch: ['**/*.spec.js', '**/*.spec.ts', '**/*.test.js', '**/*.test.ts'],
};
  