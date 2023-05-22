"use strict"

export class Lexorank {
    MIN_CHAR: any;
    MAX_CHAR: any;

    constructor(){
        this.MIN_CHAR = this.byte('0');
        this.MAX_CHAR = this.byte('z');
    }


    /**
     *
     * @param {String} prev
     * @param {String} next
     * @returns {Array} of [String, Boolean]
     */
    insert(prev: string, next: string){
        if (prev === '' || !prev) {
            prev = this.string(this.MIN_CHAR);
        }
        if (next === '' || !next) {
            next = this.string(this.MAX_CHAR);
        }

        let rank = '';
        let i = 0;

        while (true) {
            let prevChar = this.getChar(prev, i, this.MIN_CHAR);
            let nextChar = this.getChar(next, i, this.MAX_CHAR);

            if (prevChar === nextChar) {
                rank += this.string(prevChar);
                i++;
                continue;
            }

            let midChar = this.mid(prevChar, nextChar);
            if (midChar === prevChar || midChar === nextChar) {
                rank += this.string(prevChar);
                i++;
                continue;
            }

            rank += this.string(midChar);
            break;
        }

        if (rank >= next) {
            return [prev, false];
        }
        return [rank, true];
    }


    /**
     *
     * @param {Number} prev
     * @param {Number} next
     * @returns {Number}
     */
    mid(prev: number, next: number): number{
        // TODO: consider to use 8 steps each jump
        return Math.floor((prev + next) / 2);
    }

    /**
     * @param {Number} i
     * @param {String} str
     * @param {Number} defaultChar
     */
    getChar(str: string, i: number, defaultChar: number){
        if (i >= str.length) {
            return defaultChar;
        }
        return this.byte(str.charAt(i));
    }


    /**
     * @returns {Number}
     * @param {string} char
     */
    byte(char: string): number{
        return char.charCodeAt(0);
    }

    /**
     * @returns {String}
     * @param {Number} byte
     */
    string(byte: number): string{
        return String.fromCharCode(byte);
    }

}
