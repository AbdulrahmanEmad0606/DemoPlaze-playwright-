class Helpers {
  // Utility: generate unique username
  generateUsername(prefix = 'user') {
    return prefix +Date.now();
  }
  // Utility: handle alert
  async handleAlert(page) {
    return new Promise((resolve) => {
      page.once('dialog', async dialog => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });
  }
}
export default Helpers;