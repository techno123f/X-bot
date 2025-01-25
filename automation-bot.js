const { remote } = require("webdriverio");
const config = require("./appium-config");

const runBot = async () => {
  const driver = await remote({
    path: "/wd/hub",
    port: 4723,
    capabilities: {
      platformName: config.platformName,
      platformVersion: config.platformVersion,
      deviceName: config.deviceName,
      appPackage: config.appPackage,
      appActivity: config.appActivity,
      automationName: config.automationName,
    },
  });

  try {
    // Wait for the app to load
    await driver.pause(5000);

    // Log in to Reddit/X.com
    console.log("Logging in...");
    const loginButton = await driver.$("ACCESSIBILITY_ID_OF_LOGIN_BUTTON"); // Replace with the actual accessibility ID
    await loginButton.click();
    await driver.pause(2000);

    const usernameField = await driver.$("ACCESSIBILITY_ID_OF_USERNAME_FIELD");
    await usernameField.setValue("your_username");

    const passwordField = await driver.$("ACCESSIBILITY_ID_OF_PASSWORD_FIELD");
    await passwordField.setValue("your_password");

    const submitButton = await driver.$("ACCESSIBILITY_ID_OF_SUBMIT_BUTTON");
    await submitButton.click();
    await driver.pause(5000);

    // Posting content
    console.log("Posting content...");
    const postButton = await driver.$("ACCESSIBILITY_ID_OF_POST_BUTTON"); // For Reddit
    await postButton.click();
    await driver.pause(2000);

    const postTextField = await driver.$("ACCESSIBILITY_ID_OF_POST_TEXT_FIELD");
    await postTextField.setValue("This is an automated post.");
    const submitPost = await driver.$("ACCESSIBILITY_ID_OF_SUBMIT_POST_BUTTON");
    await submitPost.click();
    await driver.pause(5000);

    // Commenting
    console.log("Commenting...");
    const commentButton = await driver.$("ACCESSIBILITY_ID_OF_COMMENT_BUTTON");
    await commentButton.click();
    const commentField = await driver.$("ACCESSIBILITY_ID_OF_COMMENT_FIELD");
    await commentField.setValue("Nice post!");
    const submitComment = await driver.$("ACCESSIBILITY_ID_OF_SUBMIT_COMMENT_BUTTON");
    await submitComment.click();
    await driver.pause(5000);

    // Liking a post
    console.log("Liking a post...");
    const likeButton = await driver.$("ACCESSIBILITY_ID_OF_LIKE_BUTTON");
    await likeButton.click();
    await driver.pause(2000);

    // Sending a DM (Direct Message)
    console.log("Sending a DM...");
    const dmButton = await driver.$("ACCESSIBILITY_ID_OF_DM_BUTTON");
    await dmButton.click();
    const recipientField = await driver.$("ACCESSIBILITY_ID_OF_RECIPIENT_FIELD");
    await recipientField.setValue("recipient_username");
    const messageField = await driver.$("ACCESSIBILITY_ID_OF_MESSAGE_FIELD");
    await messageField.setValue("Hello, this is a test DM.");
    const sendButton = await driver.$("ACCESSIBILITY_ID_OF_SEND_BUTTON");
    await sendButton.click();
    await driver.pause(5000);

    console.log("Automation tasks completed!");
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await driver.deleteSession();
  }
};

runBot();
