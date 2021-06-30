import { Builder, By } from "selenium-webdriver";
import "../node_modules/chromedriver";

jest.setTimeout(100000);

const destinationPath = "http://localhost:3000/";
const driver = new Builder().forBrowser("chrome").build();
driver.manage().window().maximize();
driver.get(destinationPath);

describe("click button", () => {
  test("should click the update button", async () => {
    // jest.useFakeTimers(3000);
    const updateBtn = await driver.findElement(By.id("custom-btn-1"));
    await updateBtn.click();
    await driver.sleep(1000);
  });

  test("should click the pump water button", async () => {
    // jest.useFakeTimers(3000);
    const pumpBtn = await driver.findElement(By.id("custom-btn-3"));
    await pumpBtn.click();
    await driver.sleep(8000);
  });
});

describe("navigating some endpoint", () => {
  test("should navigate to /history endpoint", async () => {
    const historyNavLink = await driver.findElement(
      By.css(`a[href="/history"]`)
    );
    await historyNavLink.click();
    await driver.sleep(5000);
  });

  test("should navigate to /not-found endpoint", async () => {
    driver.navigate().to("http://localhost:3000/not-found");
    await driver.sleep(5000);
    driver.quit();
  });
});
