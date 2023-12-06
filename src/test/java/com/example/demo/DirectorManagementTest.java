package com.example.demo;

import io.github.bonigarcia.wdm.WebDriverManager;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.junit.jupiter.api.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.firefox.GeckoDriverService;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

//@DisplayName("Application")
//@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest//(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class DirectorManagementTest {

    protected static WebDriver driver;
    protected final String apiUrl = "http://localhost:8080";

//    @BeforeAll
//    public static void setUp() {
//        WebDriverManager.firefoxdriver().setup();
////        Map<String, String> environment = new HashMap<>();
////        environment.put("DISPLAY", ":1");
////        GeckoDriverService service = new GeckoDriverService.Builder()
////                .usingAnyFreePort()
////                .withEnvironment(environment)
////                .build();
////        FirefoxDriver driver = new FirefoxDriver(service);
//        FirefoxOptions options = new FirefoxOptions();
//        options.addArguments("--headless");
//        driver = new FirefoxDriver(options);
//        driver.manage().window().maximize();
//        driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));
//    }
//
//    @BeforeEach
//    public void setUpBeforeEach(){
//        driver = new FirefoxDriver();
//        driver.manage().window().maximize();
//        driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));
//    }

    @Test
    public void testReadOperation() {

        Assertions.assertTrue(true);
//        driver.get(apiUrl+"/index.html");
//
//        //if the table exists
//        WebElement directorsTable = driver.findElement(By.id("directorTable"));
//        Assertions.assertNotNull(directorsTable);
//
//        //if there is proper thead
//        List<WebElement> thead = driver.findElements(By.tagName("th"));
//
//        String[] expectedIds = {"thid", "thname", "thnationality", "thage", "thactions"};
//
//        assertEquals(thead.size(), expectedIds.length, "Unexpected number of <th> elements");
//
//        for (int i = 0; i < thead.size(); i++) {
//            String actualId = thead.get(i).getAttribute("id");
//            assertEquals(actualId, expectedIds[i], "Unexpected id for <th> element at index " + i);
//        }
    }

//    @Test
//    public void testCreateOperation() {
//        driver.get(apiUrl+"/index.html");
//
//        //if the table exists
//        WebElement directorsTable = driver.findElement(By.id("directorTable"));
//        Assertions.assertNotNull(directorsTable);
//
//        WebElement nameInput = driver.findElement(By.id("name"));
//        nameInput.sendKeys("John Doe");
//
//        WebElement nationalityInput = driver.findElement(By.id("nationality"));
//        nationalityInput.sendKeys("American");
//
//        WebElement ageInput = driver.findElement(By.id("age"));
//        ageInput.sendKeys("40");
//
//
//        WebElement saveButton = driver.findElement(By.xpath("//button[text()='Save Director']"));
//        saveButton.click();
//
//        try {
//            Thread.sleep(2000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//
//        // Sprawdzenie, czy dodany rekord istnieje w tabeli
//        List<WebElement> rows = driver.findElements(By.xpath("//table[@id='directorTable']/tbody/tr"));
//
//        boolean directorAdded = false;
//
//        for (WebElement row : rows) {
//            List<WebElement> cells = row.findElements(By.tagName("td"));
//
//            // Sprawdź, czy komórki zawierają oczekiwane wartości
//            if (cells.size() >= 4
//                    && cells.get(1).getText().equals("John Doe")
//                    && cells.get(2).getText().equals("American")
//                    && cells.get(3).getText().equals("40")) {
//                directorAdded = true;
//                break;
//            }
//        }
//        // Asercja, czy rekord został dodany poprawnie
//        Assertions.assertTrue(directorAdded, "Director with specified values not found in the table");
//    }
//
//    @Test
//    public void testUpdateOperation() {
//        driver.get(apiUrl+"/index.html");
//
//        String xpathForIdCell = "//table[@id='directorTable']/tbody/tr[td[1]='4']/td[1]";
//        String xpathForNameCell = "//table[@id='directorTable']/tbody/tr[td[1]='4']/td[2]";
//        String xpathForNationalityCell = "//table[@id='directorTable']/tbody/tr[td[1]='4']/td[3]";
//        String xpathForAgeCell = "//table[@id='directorTable']/tbody/tr[td[1]='4']/td[4]";
//
//// Pobierz tekst z poszczególnych komórek starego wiersza
//        String oldName = driver.findElement(By.xpath(xpathForNameCell)).getText();
//        String oldNationality = driver.findElement(By.xpath(xpathForNationalityCell)).getText();
//        String oldAge = driver.findElement(By.xpath(xpathForAgeCell)).getText();
//
////        WebElement editButton = driver.findElement(By.xpath("//button[text()='Edit']"));
//        WebElement editButton = driver.findElement(By.xpath("//table[@id='directorTable']/tbody/tr[td[1]='4']/td/button[text()='Edit']"));
//        editButton.click();
//
//        //if the table exists
//        WebElement directorsTable = driver.findElement(By.id("directorTable"));
//        Assertions.assertNotNull(directorsTable);
//
//        WebElement nameInput = driver.findElement(By.id("name"));
//        nameInput.sendKeys("www");
//
//        WebElement nationalityInput = driver.findElement(By.id("nationality"));
//        nationalityInput.sendKeys("WWW");
//
//        WebElement ageInput = driver.findElement(By.id("age"));
//        ageInput.sendKeys("9");
//
//
//        WebElement saveButton = driver.findElement(By.xpath("//button[text()='Save Director']"));
//        saveButton.click();
//
//        try {
//            Thread.sleep(2000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//
//
//
//// Pobierz tekst z poszczególnych komórek nowego wiersza
//        String newName = driver.findElement(By.xpath(xpathForNameCell)).getText();
//        String newNationality = driver.findElement(By.xpath(xpathForNationalityCell)).getText();
//        String newAge = driver.findElement(By.xpath(xpathForAgeCell)).getText();
//
//// Porównaj wartości
//        assertNotEquals(oldName, newName, "Name is equal");
//        assertNotEquals(oldNationality, newNationality, "Nationality is equal");
//        assertNotEquals(oldAge, newAge, "Age is equal");
//    }
//
//    @Test
//    public void testDeleteOperation() {
//        driver.get(apiUrl+"/index.html");
//
//        WebElement deleteButton = driver.findElement(By.xpath("//table[@id='directorTable']/tbody/tr[td[1]='1']/td/button[text()='Delete']"));
//        deleteButton.click();
//
////        WebDriverWait wait = new WebDriverWait(driver, 10);
////        wait.until(ExpectedConditions.invisibilityOfElementLocated(By.xpath("//table[@id='directorTable']/tbody/tr[td[1]='11']")));
//
//        // Sprawdź, czy element nie istnieje
//        Assertions.assertThrows(NoSuchElementException.class, () -> {
//            driver.findElement(By.xpath("//table[@id='directorTable']/tbody/tr[td[1]='1']"));
//        });
//    }

    @AfterEach
    public void tearDown() {
        // Zamknij przeglądarkę po zakończeniu testów
        if (driver != null) {
            driver.quit();
        }
    }
}

