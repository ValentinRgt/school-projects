package org.epitech.pacman2dgame.Ghost;

import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import org.epitech.pacman2dgame.Game;

import java.util.Objects;

public class Pinky extends Ghost {
    private final int mapHeight = Game.getMapHeight();
    private final int mapWidth = Game.getMapWidth();

    public Pinky(int row, int column) {
        super("Pinky");
        super.row = row;
        super.column = column;
        super.ghostUp = new Image(Objects.requireNonNull(getClass().getResourceAsStream("/org/epitech/pacman2dgame/images/pinky/pinky_up.gif")));
        super.ghostDown = new Image(Objects.requireNonNull(getClass().getResourceAsStream("/org/epitech/pacman2dgame/images/pinky/pinky_down.gif")));
        super.ghostLeft = new Image(Objects.requireNonNull(getClass().getResourceAsStream("/org/epitech/pacman2dgame/images/pinky/pinky_left.gif")));
        super.ghostRight = new Image(Objects.requireNonNull(getClass().getResourceAsStream("/org/epitech/pacman2dgame/images/pinky/pinky_right.gif")));
        ImageView pinky = new ImageView(super.ghostUp);
        pinky.setFitHeight(25);
        pinky.setFitWidth(25);
        super.currentGhost = pinky;
    }

    public int getMapHeight() {
        return mapHeight;
    }

    public int getMapWidth() {
        return mapWidth;
    }

    @Override
    public void moveRandomly() {
        // Directions possibles: haut, bas, gauche, droite
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        boolean moved = false;

        while (!moved) {
            // Choisir une direction aléatoire
            int index = (int) (Math.random() * directions.length);
            int dx = directions[index][0];
            int dy = directions[index][1];

            // Calculer la nouvelle position
            int newRow = row + dx;
            int newCol = column + dy;

            // Vérifier si la nouvelle position est dans la grille et si elle est valide ('S' ou 'E')
            if (newRow >= 0 && newRow < mapHeight && newCol >= 0 && newCol < mapWidth) {
                char cell = super.gameGrid[newRow][newCol];
                if (cell == 'S' || cell == 'E' || cell == 'D') {
                    if (dx == -1) {
                        super.turnUp();
                    } else if (dx == 1) {
                        super.turnDown();
                    } else if (dy == -1) {
                        super.turnLeft();
                    } else if (dy == 1) {
                        super.turnRight();
                    }

                    // Mettre à jour la position de Blinky
                    row = newRow;
                    column = newCol;
                    moved = true;
                }
            }
        }
    }

    @Override
    public boolean isCloseToPacman(int pacmanRow, int pacmanColumn) {
        return super.getColumn() == pacmanColumn && super.getRow() == pacmanRow;
    }
}