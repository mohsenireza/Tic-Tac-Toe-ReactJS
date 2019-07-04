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
        ],
        isPopupVisible: false,
        popupTitle: ''
    }

    constructor(props) {
        super(props);
        this.pixels = {
            pixel1: React.createRef(),
            pixel2: React.createRef(),
            pixel3: React.createRef(),
            pixel4: React.createRef(),
            pixel5: React.createRef(),
            pixel6: React.createRef(),
            pixel7: React.createRef(),
            pixel8: React.createRef(),
            pixel9: React.createRef(),
        }
    }

    checkResult = () => {
        for (let i = 0; i < this.state.selectedPixelsToWin.length; i++) {
            const element = this.state.selectedPixelsToWin[i];
            let win = true;
            element.forEach(element => {
                win = win && (this.state.turn === 'p1'? this.state.selectedPixelsByPlayer1.includes(element) : this.state.selectedPixelsByPlayer2.includes(element));
            });
            if(win) { // someone won
                this.setState({
                    isPopupVisible: true,
                    popupTitle: this.state.turn === 'p1'? 'You Win' : 'You Lose'
                });
                return;
            }
        }
        // check if all pixels filled
        if(this.state.selectedPixelsByPlayer1.length + this.state.selectedPixelsByPlayer2.length === 9) {
            this.setState({
                isPopupVisible: true,
                popupTitle: 'Game Over'
            });
            return;
        }
        // no one won, game is continuing
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

    handleReloadGame = (e) => {
        this.setState({
            turn: 'p1',
            selectedPixelsByPlayer1: [],
            selectedPixelsByPlayer2: [],
            isPopupVisible: false,
            popupTitle: ''
        });
        for (let i = 1; i <= 9; i++) {
            this.pixels['pixel' + i].current.classList.remove('pixel-selected-p1')
            this.pixels['pixel' + i].current.classList.remove('pixel-selected-p2')
        }
    }

    render() {
        return (
            <div>
                <div style = {styles.gameZone}>
                    <div id="1" onClick={this.handleClickPixel} ref={this.pixels.pixel1} style={styles.pixel}></div>
                    <div id="2" onClick={this.handleClickPixel} ref={this.pixels.pixel2} style={{...styles.pixel, ...styles.leftBordered, ...styles.rightBordered}}></div>
                    <div id="3" onClick={this.handleClickPixel} ref={this.pixels.pixel3} style={styles.pixel}></div>
                    <div id="4" onClick={this.handleClickPixel} ref={this.pixels.pixel4} style={{...styles.pixel, ...styles.topBordered, ...styles.bottomBordered}}></div>
                    <div id="5" onClick={this.handleClickPixel} ref={this.pixels.pixel5} style={{...styles.pixel, ...styles.bordered}}></div>
                    <div id="6" onClick={this.handleClickPixel} ref={this.pixels.pixel6} style={{...styles.pixel, ...styles.topBordered, ...styles.bottomBordered}}></div>
                    <div id="7" onClick={this.handleClickPixel} ref={this.pixels.pixel7} style={styles.pixel}></div>
                    <div id="8" onClick={this.handleClickPixel} ref={this.pixels.pixel8} style={{...styles.pixel, ...styles.leftBordered, ...styles.rightBordered}}></div>
                    <div id="9" onClick={this.handleClickPixel} ref={this.pixels.pixel9} style={styles.pixel}></div>
                </div>  
                 <div className={this.state.isPopupVisible? "popup-container show" : "popup-container"}>
                    <div className="popup-box">
                        <h1 className="popup-title">{this.state.popupTitle}</h1>
                        <span onClick={this.handleReloadGame} className="popup-reload">Play Again</span>
                    </div>
                </div>
            </div>           
        );
    }
}

const styles = {
    gameZone: {
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

  