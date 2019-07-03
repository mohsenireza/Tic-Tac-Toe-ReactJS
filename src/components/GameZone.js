import React from 'react';
import './GameZone.css';

class GameZone extends React.Component {
    state = {
        turn: 'p1',
        selectedPixelsByPlayer1: [],
        selectedPixelsByPlayer2: [],
        selectedPixelsToWin: [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['1', '4', '7'],
            ['2', '5', '8'],
            ['3', '6', '9'],
            ['1', '5', '9'],
            ['3', '5', '7'],
        ]
    }

    checkResult = () => {
        for (let i = 0; i < this.state.selectedPixelsToWin.length; i++) {
            const element = this.state.selectedPixelsToWin[i];
            let win = true;
            element.forEach(element => {
                win = win && (this.state.turn === 'p1'? this.state.selectedPixelsByPlayer1.includes(element) : this.state.selectedPixelsByPlayer2.includes(element));
            });
            if(win) { // someone won
                console.log(`${this.state.turn} is win`);
                return;
            }
        }
        // no one won
        this.changeTurn();
    }

    changeTurn = () => {
        if(this.state.turn === 'p1') 
            this.setState({turn: 'p2'});
        else 
            this.setState({turn: 'p1'});
    }

    selectPixel = (pixel) => {
        if(pixel.classList.contains('pixel-selected-p1') || pixel.classList.contains('pixel-selected-p2')) {
            return;
        }
        if(this.state.turn === 'p1') {
            pixel.classList.add('pixel-selected-p1');
            this.setState({selectedPixelsByPlayer1: [...this.state.selectedPixelsByPlayer1, pixel.id]}, this.checkResult);
        }
        else {
            pixel.classList.add('pixel-selected-p2');
            this.setState({selectedPixelsByPlayer2: [...this.state.selectedPixelsByPlayer2, pixel.id]}, this.checkResult);
        }
    }

    handleClickPixel = (e) => {
        this.selectPixel(e.target);
    }

    render() {
        return (
            <div style = {styles.container}>
                <div id="1" onClick={this.handleClickPixel} style={styles.pixel}></div>
                <div id="2" onClick={this.handleClickPixel} style={{...styles.pixel, ...styles.leftBordered, ...styles.rightBordered}}></div>
                <div id="3" onClick={this.handleClickPixel} style={styles.pixel}></div>
                <div id="4" onClick={this.handleClickPixel} style={{...styles.pixel, ...styles.topBordered, ...styles.bottomBordered}}></div>
                <div id="5" onClick={this.handleClickPixel} style={{...styles.pixel, ...styles.bordered}}></div>
                <div id="6" onClick={this.handleClickPixel} style={{...styles.pixel, ...styles.topBordered, ...styles.bottomBordered}}></div>
                <div id="7" onClick={this.handleClickPixel} style={styles.pixel}></div>
                <div id="8" onClick={this.handleClickPixel} style={{...styles.pixel, ...styles.leftBordered, ...styles.rightBordered}}></div>
                <div id="9" onClick={this.handleClickPixel} style={styles.pixel}></div>
            </div>  
        );
    }
}

const styles = {
    container: {
      margin: '100px auto',
      display: 'flex',
      flexWrap: 'wrap',
      height: '500px',
      width: '500px',
      justifyContent: 'center',
      alignContent: 'center',
    },
    pixel: {
      height: '33.2%',
      width: '33.2%',
    },
    topBordered: {
      borderTop: '1px solid #ccc'
    },
    bottomBordered: {
      borderBottom: '1px solid #ccc'
    },
    leftBordered: {
      borderLeft: '1px solid #ccc'
    },
    rightBordered: {
      borderRight: '1px solid #ccc'
    },
    bordered: {
      border: '1px solid #ccc'
    }
}

export default GameZone;

  