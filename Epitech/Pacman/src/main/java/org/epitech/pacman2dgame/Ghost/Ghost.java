package org.epitech.pacman2dgame.Ghost;

import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

public abstract class Ghost {
    protected String name;
    protected Image ghostUp = null;
    protected Image ghostDown = null;
    protected Image ghostLeft = null;
    protected Image ghostRight = null;
    protected ImageView currentGhost = null;
    protected int row = 0;
    protected int column = 0;
    protected char[][] gameGrid = null;

    protected Ghost(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public Image getGhostUp() {
        return ghostUp;
    }

    public Image getGhostDown() {
        return ghostDown;
    }

    public Image getGhostLeft() {
        return ghostLeft;
    }

    public Image getGhostRight() {
        return ghostRight;
    }

    public ImageView getCurrentGhost() {
        return currentGhost;
    }

    public void turnLeft() {
        this.currentGhost.setImage(this.ghostLeft);
    }

    public void turnRight() {
        this.currentGhost.setImage(this.ghostRight);
    }

    public void turnUp() {
        this.currentGhost.setImage(this.ghostUp);
    }

    public void turnDown() {
        this.currentGhost.setImage(this.ghostDown);
    }

    public int getRow() {
        return row;
    }

    public int getColumn() {
        return column;
    }

    public char[][] getGameGrid() {
        return gameGrid;
    }

    public void setGameGrid(char[][] gameGrid) {
        this.gameGrid = gameGrid;
    }

    public abstract void moveRandomly();

    public abstract boolean isCloseToPacman(int pacmanRow, int pacmanColumn);
}