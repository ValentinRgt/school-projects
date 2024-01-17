package org.epitech.pacman2dgame.Controller;

import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.animation.TranslateTransition;
import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.geometry.HPos;
import javafx.geometry.Pos;
import javafx.geometry.VPos;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.media.Media;
import javafx.scene.media.MediaPlayer;
import javafx.scene.paint.Color;
import javafx.scene.paint.ImagePattern;
import javafx.scene.shape.Rectangle;
import org.epitech.pacman2dgame.Configuration;
import org.epitech.pacman2dgame.Game;
import org.epitech.pacman2dgame.Ghost.*;
import org.epitech.pacman2dgame.Pacman;
import javafx.util.Duration;

import java.io.IOException;
import java.net.URL;
import java.util.Objects;
import java.util.ResourceBundle;
import java.util.Timer;
import java.util.TimerTask;

public class InterfaceController implements Initializable {
    @FXML
    public VBox vBox;
    private boolean ended = false;
    private boolean paused = false;
    private boolean gameOver = false;
    private int timerPass = 0;
    private VBox pauseMenu = new VBox();
    private final VBox endMenu = new VBox();
    private final GridPane gridPane = new GridPane();
    private final Game game = new Game();
    private Pacman pacman = null;
    private Blinky blinky = null;
    private Inky inky = null;
    private Clyde clyde = null;
    private Pinky pinky = null;
    private ImageView pacmanImageView, blinkyImageView, inkyImageView, pinkyImageView, clydeImageView;
    private MediaPlayer mediaPlayer = null;
    private char[][] map = null;
    private int dotCount = 0;
    private int dotEat = 0;
    private Timer timer = new Timer();
    private final Label scoreLabel = new Label();
    private final Label timerText = new Label();
    private final Label livesLabel = new Label();
    private TimerTask task;
    private static final int CELL_SIZE = 25;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        System.out.println("Interface initialized");

        vBox.setOnKeyPressed(this::handleEventKey);
        try {
            this.map = this.game.loadStage();
            this.createGameBoard(this.map);
            this.pacman.setGameGrid(map);
            this.blinky.setGameGrid(map);
            this.inky.setGameGrid(map);
            this.pinky.setGameGrid(map);
            this.clyde.setGameGrid(map);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        this.runMusic();
        startTimer();

        vBox.requestFocus();
    }

    public void startTimer() {
        timerPass = 0;
        timer.cancel();
        timer = new Timer();
        task = new TimerTask() {
            @Override
            public void run() {
                Platform.runLater(() -> {
                    timerText.setText("Time spent: " + timerPass);
                });
                timerPass++;
            }
        };
        timer.scheduleAtFixedRate(task, 0, 1000);
    }

    public void handleEventKey(KeyEvent keyEvent) {

        switch (keyEvent.getCode()) {
            case LEFT:
                pacmanLeft();
                break;
            case RIGHT:
                pacmanRight();
                break;
            case UP:
                pacmanUp();
                break;
            case DOWN:
                pacmanDown();
                break;
            case ESCAPE:
                this.pauseMenu();
                break;
        }
    }

    private void createGameBoard(char[][] map) {
        for (int i = 0; i < map.length; i++) {
            for (int j = 0; j < map[i].length; j++) {

                if (map[i][j] == 'W') {
                    Rectangle rect = new Rectangle();
                    rect.setHeight(25);
                    rect.setWidth(25);
                    rect.setFill(Color.BLUE);
                    GridPane.setRowIndex(rect, i);
                    GridPane.setColumnIndex(rect, j);
                    this.gridPane.getChildren().add(rect);
                }

                if (map[i][j] == 'E') {
                    Rectangle rect = new Rectangle();
                    rect.setHeight(25);
                    rect.setWidth(25);
                    rect.setFill(Color.TRANSPARENT);
                    GridPane.setRowIndex(rect, i);
                    GridPane.setColumnIndex(rect, j);
                    this.gridPane.getChildren().add(rect);
                }

                if (map[i][j] == 'D') {
                    Rectangle rect = new Rectangle();
                    rect.setHeight(10);
                    rect.setWidth(25);
                    rect.setFill(Color.YELLOW);
                    GridPane.setRowIndex(rect, i);
                    GridPane.setColumnIndex(rect, j);
                    GridPane.setHalignment(rect, HPos.CENTER);
                    GridPane.setValignment(rect, VPos.CENTER);
                    this.gridPane.getChildren().add(rect);
                }

                if (map[i][j] == '1') {
                    this.blinky = new Blinky(i, j);
                    System.out.println(this.blinky.getName() + " initialized");
                    blinkyImageView = this.blinky.getCurrentGhost();
                    GridPane.setRowIndex(blinkyImageView, i);
                    GridPane.setColumnIndex(blinkyImageView, j);
                    this.gridPane.getChildren().add(blinkyImageView);
                    Timeline moveTimeline;
                    moveTimeline = new Timeline(new KeyFrame(Duration.seconds(0.50), e -> randomlyAutomaticMove(this.blinky, blinkyImageView)));
                    moveTimeline.setCycleCount(Timeline.INDEFINITE);
                    moveTimeline.play();
                }

                if (map[i][j] == '2') {
                    this.inky = new Inky(i, j);
                    System.out.println(this.inky.getName() + " initialized");
                    inkyImageView = this.inky.getCurrentGhost();
                    GridPane.setRowIndex(inkyImageView, i);
                    GridPane.setColumnIndex(inkyImageView, j);
                    this.gridPane.getChildren().add(inkyImageView);
                    Timeline moveTimeline;
                    moveTimeline = new Timeline(new KeyFrame(Duration.seconds(0.50), e -> randomlyAutomaticMove(this.inky, inkyImageView)));
                    moveTimeline.setCycleCount(Timeline.INDEFINITE);
                    moveTimeline.play();
                }

                if (map[i][j] == '3') {
                    this.clyde = new Clyde(i, j);
                    System.out.println(this.clyde.getName() + " initialized");
                    clydeImageView = this.clyde.getCurrentGhost();
                    GridPane.setRowIndex(clydeImageView, i);
                    GridPane.setColumnIndex(clydeImageView, j);
                    this.gridPane.getChildren().add(clydeImageView);
                    Timeline moveTimeline;
                    moveTimeline = new Timeline(new KeyFrame(Duration.seconds(0.50), e -> randomlyAutomaticMove(this.clyde, clydeImageView)));
                    moveTimeline.setCycleCount(Timeline.INDEFINITE);
                    moveTimeline.play();
                }

                if (map[i][j] == '4') {
                    this.pinky = new Pinky(i, j);
                    System.out.println(this.pinky.getName() + " initialized");
                    pinkyImageView = this.pinky.getCurrentGhost();
                    GridPane.setRowIndex(pinkyImageView, i);
                    GridPane.setColumnIndex(pinkyImageView, j);
                    this.gridPane.getChildren().add(pinkyImageView);
                    Timeline moveTimeline;
                    moveTimeline = new Timeline(new KeyFrame(Duration.seconds(0.50), e -> randomlyAutomaticMove(this.pinky, pinkyImageView)));
                    moveTimeline.setCycleCount(Timeline.INDEFINITE);
                    moveTimeline.play();
                }

                if (map[i][j] == 'P') {
                    this.pacman = new Pacman(i, j);
                    System.out.println(this.pacman.getName() + " initialized");
                    pacmanImageView = this.pacman.getCurrentImage();
                    GridPane.setRowIndex(pacmanImageView, i);
                    GridPane.setColumnIndex(pacmanImageView, j);
                    this.gridPane.getChildren().add(pacmanImageView);
                }

                if (map[i][j] == 'S') {
                    Rectangle rect = new Rectangle();
                    rect.setHeight(10);
                    rect.setWidth(10);
                    Image dot = new Image(Objects.requireNonNull(
                            getClass().getResourceAsStream("/org/epitech/pacman2dgame/images/dot.gif")));
                    rect.setFill(new ImagePattern(dot));
                    this.dotCount++;
                    GridPane.setRowIndex(rect, i);
                    GridPane.setColumnIndex(rect, j);
                    GridPane.setHalignment(rect, HPos.CENTER);
                    GridPane.setValignment(rect, VPos.CENTER);
                    this.gridPane.getChildren().add(rect);
                }

                if (map[i][j] == 'F') {
                    Rectangle rect = new Rectangle();
                    rect.setHeight(20);
                    rect.setWidth(20);
                    Image fruit = new Image(Objects.requireNonNull(getClass().getResourceAsStream(Game.getFruit())));
                    rect.setFill(new ImagePattern(fruit));
                    this.dotCount++;
                    GridPane.setRowIndex(rect, i);
                    GridPane.setColumnIndex(rect, j);
                    GridPane.setHalignment(rect, HPos.CENTER);
                    GridPane.setValignment(rect, VPos.CENTER);
                    this.gridPane.getChildren().add(rect);
                }
            }
        }

        this.scoreLabel.setTextFill(Color.WHITE);
        this.scoreLabel.setStyle("-fx-font-size: 20px");
        this.timerText.setTextFill(Color.WHITE);
        this.timerText.setStyle("-fx-font-size: 20px");
        this.scoreLabel.setText("Score: " + this.pacman.getScore());

        HBox topStatusBox = new HBox(10);
        topStatusBox.setAlignment(Pos.CENTER);

        topStatusBox.getChildren().addAll(scoreLabel, timerText);

        vBox.getChildren().add(topStatusBox);

        this.gridPane.setAlignment(Pos.CENTER);
        vBox.getChildren().add(this.gridPane);
        vBox.setAlignment(Pos.CENTER);
        vBox.setSpacing(25);

        HBox bottomStatusBox = new HBox(10);
        bottomStatusBox.setAlignment(Pos.CENTER);
        this.livesLabel.setText("Lives: " + this.pacman.getLives());
        this.livesLabel.setTextFill(Color.WHITE);
        this.livesLabel.setStyle("-fx-font-size: 20px");

        bottomStatusBox.getChildren().addAll(livesLabel);

        vBox.getChildren().add(bottomStatusBox);
    }

    private void randomlyAutomaticMove(Ghost ghost, ImageView imageView) {
        if (!this.paused) {
            int oldRow = ghost.getRow();
            int oldColumn = ghost.getColumn();

            ghost.moveRandomly();

             boolean ghostEatingPacman = ghost.isCloseToPacman(this.pacman.getRow(), this.pacman.getColumn());
             if (ghostEatingPacman) {
                 this.collisionBetweenPacmanAndGhost(ghost);
             }

            int newRow = ghost.getRow();
            int newColumn = ghost.getColumn();

            double deltaX = (newColumn - oldColumn) * CELL_SIZE;
            double deltaY = (newRow - oldRow) * CELL_SIZE;

            TranslateTransition transition = new TranslateTransition(Duration.millis(450), imageView);
            transition.setByX(deltaX);
            transition.setByY(deltaY);
            transition.play();
        }
    }

    private void runMusic() {
        try {
            URL resource = getClass().getResource("/org/epitech/pacman2dgame/sounds/pacman.mp3");
            if (resource != null) {
                Media sound = new Media(resource.toString());
                this.mediaPlayer = new MediaPlayer(sound);

                this.mediaPlayer.setVolume(1);

                this.mediaPlayer.play();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void switchToMain() throws IOException {
        this.mediaPlayer.stop();
        FXMLLoader loader = new FXMLLoader(getClass().getResource("/org/epitech/pacman2dgame/views/main.fxml"));
        Parent interfaceView = loader.load();
        vBox.getScene().setRoot(interfaceView);
        interfaceView.requestFocus();
    }

    public void switchToInterface() throws IOException {
        this.mediaPlayer.stop();
        FXMLLoader loader = new FXMLLoader(getClass().getResource("/org/epitech/pacman2dgame/views/interface.fxml"));
        Parent interfaceView = loader.load();
        vBox.getScene().setRoot(interfaceView);
        interfaceView.requestFocus();
    }

    private void pauseMenu() {
        if (!this.ended) {
            if (this.paused) {
                vBox.getChildren().remove(this.pauseMenu);
                this.paused = false;
                this.pauseMenu = new VBox();
                this.gridPane.setOpacity(1);
                this.mediaPlayer.play();
                vBox.requestFocus();
            } else {
                this.mediaPlayer.pause();
                Label pausedLabel = new Label("PAUSED");
                pausedLabel.setTextFill(Color.WHITE);
                pausedLabel.setStyle("-fx-font-size: 40px");

                Button resumeButton = new Button("RESUME");
                resumeButton.setOnAction(e -> {
                    this.pauseMenu();
                });

                Button quitButton = new Button("QUIT");
                quitButton.setOnAction(e -> {
                    try {
                        this.switchToMain();
                    } catch (IOException e1) {
                        System.out.println(e1.getMessage());
                    }
                });

                this.pauseMenu.setAlignment(Pos.CENTER);
                this.pauseMenu.setSpacing(10);
                this.pauseMenu.getChildren().addAll(pausedLabel, resumeButton, quitButton);
                this.gridPane.setOpacity(0.2);
                this.paused = true;

                vBox.getChildren().add(0, this.pauseMenu);
            }
        }
    }

    private void collisionBetweenPacmanAndGhost(Ghost ghost) {
        System.out.println(ghost.getName() + " eating the pacman !");
        if (this.pacman.getLives() == 0) {
            this.gameOver = true;
            this.endGame();
        } else {
            this.pacman.removeLive();
            GridPane.setColumnIndex(pacmanImageView, this.pacman.getColStart());
            GridPane.setRowIndex(pacmanImageView, this.pacman.getRowStart());
            this.livesLabel.setText("Lives: " + this.pacman.getLives());
        }
    }

    private boolean isWall(int row, int col) {
        return this.map != null && (this.map[row][col] == 'W' || this.map[row][col] == 'D');
    }

    private void pacmanRight() {
        int currentColIndex = GridPane.getColumnIndex(pacmanImageView) != null
                ? GridPane.getColumnIndex(pacmanImageView)
                : 0;
        int currentRowIndex = GridPane.getRowIndex(pacmanImageView);

        if (!this.paused) {
            if (currentColIndex + 1 == Game.getMapWidth()) {
                GridPane.setColumnIndex(pacmanImageView, 0);
            }
            if (currentColIndex < Game.getMapWidth() - 1 && !isWall(currentRowIndex, currentColIndex + 1)) {
                GridPane.setColumnIndex(pacmanImageView, currentColIndex + 1);
                this.pacman.setColumn(currentColIndex + 1);
                this.pacman.setRow(currentRowIndex);
                this.pacman.turnRight();
                this.pacmanEat();
            } else {
                System.out.println("Blocked by the wall !");
            }
        } else {
            System.out.println("Pause menu has open");
        }
    }

    private void pacmanUp() {
        int currentRowIndex = GridPane.getRowIndex(pacmanImageView) != null ? GridPane.getRowIndex(pacmanImageView) : 0;
        int currentColIndex = GridPane.getColumnIndex(pacmanImageView);

        if (!this.paused) {
            if (currentRowIndex > 0 && !isWall(currentRowIndex - 1, currentColIndex)) {
                GridPane.setRowIndex(pacmanImageView, currentRowIndex - 1);
                this.pacman.setColumn(currentColIndex);
                this.pacman.setRow(currentRowIndex - 1);
                this.pacman.turnUp();
                this.pacmanEat();
            } else {
                System.out.println("Blocked by the wall !");
            }
        } else {
            System.out.println("Pause menu has open");
        }
    }

    private void pacmanDown() {
        int currentRowIndex = GridPane.getRowIndex(pacmanImageView);
        int currentColIndex = GridPane.getColumnIndex(pacmanImageView);

        if (!this.paused) {
            if (currentRowIndex < Game.getMapHeight() - 1 && !isWall(currentRowIndex + 1, currentColIndex)) {
                GridPane.setRowIndex(pacmanImageView, currentRowIndex + 1);
                this.pacman.setColumn(currentColIndex);
                this.pacman.setRow(currentRowIndex + 1);
                this.pacman.turnDown();
                this.pacmanEat();
            } else {
                System.out.println("Blocked by the wall !");
            }
        } else {
            System.out.println("Pause menu has open");
        }
    }

    private void pacmanLeft() {
        int currentColIndex = GridPane.getColumnIndex(pacmanImageView);
        int currentRowIndex = GridPane.getRowIndex(pacmanImageView);

        if (!this.paused) {
            if (currentColIndex == 0) {
                GridPane.setColumnIndex(pacmanImageView, Game.getMapWidth() - 1);
            }
            if (currentColIndex > 0 && !isWall(currentRowIndex, currentColIndex - 1)) {
                GridPane.setColumnIndex(pacmanImageView, currentColIndex - 1);
                this.pacman.setColumn(currentColIndex - 1);
                this.pacman.setRow(currentRowIndex);
                this.pacman.turnLeft();
                this.pacmanEat();
            } else {
                System.out.println("Blocked by the wall !");
            }
        } else {
            System.out.println("Pause menu has open");
        }
    }

    private void pacmanEat() {
        int currentColIndex = GridPane.getColumnIndex(pacmanImageView);
        int currentRowIndex = GridPane.getRowIndex(pacmanImageView);

        boolean pacmanEatingByBlinky = this.blinky.isCloseToPacman(this.pacman.getRow(), this.pacman.getColumn());
        if (this.blinky.getRow() == currentRowIndex && this.blinky.getColumn() == currentColIndex && pacmanEatingByBlinky) {
            this.collisionBetweenPacmanAndGhost(this.blinky);
        }

        boolean pacmanEatingByInky = this.inky.isCloseToPacman(this.pacman.getRow(), this.pacman.getColumn());
        if (this.inky.getRow() == currentRowIndex && this.inky.getColumn() == currentColIndex && pacmanEatingByInky) {
            this.collisionBetweenPacmanAndGhost(this.inky);
        }

        boolean pacmanEatingByClyde = this.clyde.isCloseToPacman(this.pacman.getRow(), this.pacman.getColumn());
        if (this.clyde.getRow() == currentRowIndex && this.clyde.getColumn() == currentColIndex && pacmanEatingByClyde) {
            this.collisionBetweenPacmanAndGhost(this.clyde);
        }

        boolean pacmanEatingByPinky = this.pinky.isCloseToPacman(this.pacman.getRow(), this.pacman.getColumn());
        if (this.pinky.getRow() == currentRowIndex && this.pinky.getColumn() == currentColIndex && pacmanEatingByPinky) {
            this.collisionBetweenPacmanAndGhost(this.pinky);
        }

        for (Node node : gridPane.getChildren()) {
            String stage = String.valueOf(this.map[currentRowIndex][currentColIndex]);
            if (GridPane.getRowIndex(node) == currentRowIndex && GridPane.getColumnIndex(node) == currentColIndex) {
                if (node instanceof Rectangle) {
                    if (((Rectangle) node).getFill() instanceof ImagePattern) {
                        ((Rectangle) node).setFill(Color.TRANSPARENT);
                        this.dotEat++;
                        if (stage.equals("S")) {
                            this.pacman.addScore(100);
                        }
                        if (stage.equals("F")) {
                            int randomNumber = (int) (Math.random() * 2000 - 500 + 1) + 500;
                            this.pacman.addScore(randomNumber);
                        }
                        this.scoreLabel.setText("Score : " + this.pacman.getScore());
                        if (this.dotEat == this.dotCount) {
                            System.out.println("You win !");
                            this.endGame();
                            Configuration.config.setLastScore(this.pacman.getScore());
                            Configuration.config.setBestTime(this.timerPass);
                            Configuration.save();
                        }
                    }
                }
            }
        }
    }

    private void endGame() {
        this.ended = true;
        this.paused = true;
        this.mediaPlayer.stop();

        this.endMenu.setAlignment(Pos.CENTER);
        this.endMenu.setSpacing(10);
        Label winLabel = new Label();
        if (!this.gameOver) {
            winLabel.setText("You win !");
        } else {
            winLabel.setText("GAME OVER");
        }

        this.scoreLabel.setText("Your score : " + this.pacman.getScore() + " in " + timerPass + " seconds");

        winLabel.setTextFill(Color.WHITE);
        winLabel.setStyle("-fx-font-size: 40px");

        Button restartButton = new Button("RESTART");
        restartButton.setOnAction(e -> {
            try {
                this.switchToInterface();
            } catch (IOException e1) {
                System.out.println(e1.getMessage());
            }
        });

        Button quitButton = new Button("QUIT");
        quitButton.setOnAction(e -> {
            try {
                this.switchToMain();
            } catch (IOException e1) {
                System.out.println(e1.getMessage());
            }
        });

        this.endMenu.getChildren().addAll(winLabel, scoreLabel, restartButton, quitButton);

        vBox.getChildren().clear();
        vBox.getChildren().addAll(endMenu, gridPane);

        this.gridPane.setOpacity(0.2);
    }

}
