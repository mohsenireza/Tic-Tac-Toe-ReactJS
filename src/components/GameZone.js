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
                setTimeout(() => {
                    this.setState({
                        isPopupVisible: true,
                        popupTitle: this.state.turn === 'p1'? 'You Win' : 'You Lose'
                    });
                }, this.state.turn === 'p1'? 0 : 500);
                return;
            }
        }
        // check if all pixels filled
        if(this.state.selectedPixelsByPlayer1.length + this.state.selectedPixelsByPlayer2.length === 9) {
            setTimeout(() => {
                this.setState({
                    isPopupVisible: true,
                    popupTitle: 'Game Over'
                });
            }, this.state.turn === 'p1'? 0 : 500);
            return;
        }
        // no one won, game is continuing
        this.changeTurn();
    }

    changeTurn = () => {
        if(this.state.turn === 'p1') 
            this.setState({turn: 'p2'}, this.computerSelectPixel);
        else 
            this.setState({turn: 'p1'});
    }

    computerSelectPixel() {
        let pixel;
        do {
            const randomNumber = Math.floor(Math.random() * 9) + 1;
            pixel = this.pixels['pixel' + randomNumber].current;
        } while (pixel.classList.contains('pixel-selected-p1') || pixel.classList.contains('pixel-selected-p2'));
        setTimeout(() => {
            this.selectPixel(pixel);
        }, 500);
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
        if(this.state.turn === 'p1') {
            this.selectPixel(e.target);
        }
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
                <div className="game-zone">
                    <div id="1" onClick={this.handleClickPixel} ref={this.pixels.pixel1} className="pixel"></div>
                    <div id="2" onClick={this.handleClickPixel} ref={this.pixels.pixel2} className="pixel border-left border-right"></div>
                    <div id="3" onClick={this.handleClickPixel} ref={this.pixels.pixel3} className="pixel"></div>
                    <div id="4" onClick={this.handleClickPixel} ref={this.pixels.pixel4} className="pixel border-top border-bottom"></div>
                    <div id="5" onClick={this.handleClickPixel} ref={this.pixels.pixel5} className="pixel border-full"></div>
                    <div id="6" onClick={this.handleClickPixel} ref={this.pixels.pixel6} className="pixel border-top border-bottom"></div>
                    <div id="7" onClick={this.handleClickPixel} ref={this.pixels.pixel7} className="pixel"></div>
                    <div id="8" onClick={this.handleClickPixel} ref={this.pixels.pixel8} className="pixel border-left border-right"></div>
                    <div id="9" onClick={this.handleClickPixel} ref={this.pixels.pixel9} className="pixel"></div>
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

export default GameZone;

  