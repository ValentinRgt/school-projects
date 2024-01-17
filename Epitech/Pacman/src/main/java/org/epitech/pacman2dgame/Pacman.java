package org.epitech.pacman2dgame;

import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

import java.util.Objects;

public class Pacman {
    private int id = 0;
    private final String name;
    private final Image pacmanLeft;
    private final Image pacmanRight;
    private final Image pacmanUp;
    private final Image pacmanDown;
    private final ImageView currentImage;
    private int score = 0;
    private int lives = 3;
    private int rowStart = 0;
    private int colStart = 0;
    private int row = 0;
    private int column = 0;
    protected char[][] gameGrid = null;

    public Pacman(int rowStart, int colStart) {
        this.id++;
        this.name = "Pacman #" + this.id;
        this.rowStart = rowStart;
        this.colStart = colStart;
        pacmanLeft = new Image(Objects.requireNonNull(getClass().getResourceAsStream("/org/epitech/pacman2dgame/images/pacman_left.gif")));
        pacmanRight = new Image(Objects.requireNonNull(getClass().getResourceAsStream("/org/epitech/pacman2dgame/images/pacman_right.gif")));
        pacmanUp = new Image(Objects.requireNonNull(getClass().getResourceAsStream("/org/epitech/pacman2dgame/images/pacman_up.gif")));
        pacmanDown = new Image(Objects.requireNonNull(getClass().getResourceAsStream("/org/epitech/pacman2dgame/images/pacman_down.gif")));
        ImageView imageView = new ImageView(this.pacmanLeft);
        imageView.setFitHeight(25);
        imageView.setFitWidth(25);
        this.currentImage = imageView;
    }

    public String getName() {
        return name;
    }

    public ImageView getCurrentImage() {
        return currentImage;
    }

    public void turnLeft() {
        this.currentImage.setImage(this.pacmanLeft);
    }

    public void turnRight() {
        this.currentImage.setImage(this.pacmanRight);
    }

    public void turnUp() {
        this.currentImage.setImage(this.pacmanUp);
    }

    public void turnDown() {
        this.currentImage.setImage(this.pacmanDown);
    }

    public int getScore() {
        return score;
    }

    public void addScore(int score) {
        this.score += score;
    }

    public void removeScore(int score) {
        this.score -= score;
    }

    public int getLives() {
        return lives;
    }

    public void addLive() {
        this.lives += 1;
    }

    public void removeLive() {
        this.lives -= 1;
    }

    public int getRowStart() {
        return rowStart;
    }

    public int getColStart() {
        return colStart;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getColumn() {
        return column;
    }

    public void setColumn(int column) {
        this.column = column;
    }

    public char[][] getGameGrid() {
        return gameGrid;
    }

    public void setGameGrid(char[][] gameGrid) {
        this.gameGrid = gameGrid;
    }
}