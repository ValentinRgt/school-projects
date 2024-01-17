package org.epitech.pacman2dgame;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Rectangle2D;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Screen;
import javafx.stage.Stage;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Game extends Application {
    private String currentStage;
    private String currentFruit;
    protected static int mapHeight = 0;
    protected static int mapWidth = 0;

    public Game() {
        this.loadStages();
        this.loadFruits();
    }

    private void loadStages() {
        List<String> stages = new ArrayList<>();
        URL resource = getClass().getResource("/org/epitech/pacman2dgame/stages");
        if (resource != null) {
            File stageFolder = new File(resource.getFile());
            File[] files = stageFolder.listFiles();
            if (files != null) {
                for (File file : files) {
                    stages.add("/org/epitech/pacman2dgame/stages/" + file.getName());
                    System.out.println("Stage loaded : /org/epitech/pacman2dgame/stages/" + file.getName());
                }
            } else {
                System.out.println("No files in the stage folder.");
            }
            System.out.println("Stage folder: " + stageFolder);
        } else {
            System.out.println("Unable to locate the stage folder.");
        }

        int random = (int) (Math.random() * stages.size());
        //currentStage = stages.get(random);
        currentStage = stages.get(0);
    }

    private void loadFruits() {
        List<String> fruits = new ArrayList<>();
        URL resource = getClass().getResource("/org/epitech/pacman2dgame/images/fruits");
        if (resource != null) {
            File fruitFolder = new File(resource.getFile());
            File[] files = fruitFolder.listFiles();
            if (files != null) {
                for (File file : files) {
                    fruits.add("/org/epitech/pacman2dgame/images/fruits/" + file.getName());
                    System.out.println("Fruit loaded : /org/epitech/pacman2dgame/images/fruits/" + file.getName());
                }
            } else {
                System.out.println("No files in the fruit folder.");
            }
            System.out.println("Fruit folder: " + fruitFolder);
        } else {
            System.out.println("Unable to locate the fruit folder.");
        }

        int random = (int) (Math.random() * fruits.size());
        currentFruit = fruits.get(random);
    }

    public char[][] loadStage() throws Exception {
        ArrayList<String> lines = new ArrayList<>();
        URL resource = getClass().getResource(this.currentStage);
        if (resource != null) {
            System.out.println("Map loading: " + resource.getFile());
            File stage = new File(resource.getFile());
            Scanner scanner = null;
            try {
                scanner = new Scanner(stage);
            } catch (Exception e) {
                System.out.println("Unable to load the stage.");
            }
            if (scanner != null) {
                for (int i = 0; scanner.hasNextLine(); i++) {
                    String line = scanner.nextLine();
                    lines.add(line.replace(" ", ""));
                }

                int nbDot = 0;

                for (int i = 0; i < lines.size(); i++) {
                    char[] ligneArray = lines.get(i).toCharArray();
                    for (int j = 0; j < ligneArray.length; j++) {
                        if (ligneArray[j] == 'S') {
                            nbDot++;
                        }
                    }
                }

                int random = (int) (Math.random() * nbDot);
                nbDot = 0;

                for (int i = 0; i < lines.size(); i++) {
                    char[] ligneArray = lines.get(i).toCharArray();
                    for (int j = 0; j < ligneArray.length; j++) {
                        if (ligneArray[j] == 'S') {
                            nbDot++;
                        }
                        if (nbDot == random && ligneArray[j] == 'S') {
                            ligneArray[j] = 'F';
                            break;
                        }
                    }
                    lines.set(i, new String(ligneArray));
                }

                if (lines.isEmpty()) {
                    throw new Exception("File is empty: " + stage);
                }
                mapHeight = lines.size();
                mapWidth = lines.get(0).length();
                char[][] map = new char[mapHeight][mapWidth];

                for (int row = 0; row < mapHeight; row++) {
                    if (lines.get(row).length() != mapWidth) {
                        throw new IOException("Inconsistent line length in file: " + stage);
                    }
                    map[row] = lines.get(row).toCharArray();
                }

                return map;
            }
        } else {
            System.out.println("Unable to locate the map file.");
        }
        return null;
    }

    public static String getFruit() {
        return new Game().currentFruit;
    }

    public static int getMapHeight() {
        return mapHeight;
    }

    public static int getMapWidth() {
        return mapWidth;
    }

    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("views/main.fxml"));
        Parent root = fxmlLoader.load();

        stage.setTitle("T-JAV-501 - Pacman 2D Game");

        stage.getIcons().add(new Image(String.valueOf(getClass().getResource("images/logo.png"))));
        Scene scene = new Scene(root, 1000, 1000);
        stage.setScene(scene);

        Rectangle2D primaryScreenBounds = Screen.getPrimary().getVisualBounds();
        stage.setX(primaryScreenBounds.getMinX());
        stage.setY(primaryScreenBounds.getMinY());
        stage.setWidth(primaryScreenBounds.getWidth()/2);
        stage.setHeight(primaryScreenBounds.getHeight()/2);

        stage.centerOnScreen();

        stage.show();
        root.requestFocus();
    }

    public static void run() {
        Configuration.loadConfig();
        launch();
    }
}
