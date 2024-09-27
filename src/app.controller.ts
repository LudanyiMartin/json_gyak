import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { quotes } from './quotes';
import { query } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('quotes')
  @Render('index')
  getProfile() {
    return {
      quotes: quotes.quotes
    }
  }


  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  @Get('randomQuote')
  @Render('random')
  randomQuote() {
    const rndInt = this.randomIntFromInterval(0, 29);
    return {
      quote: quotes.quotes[rndInt].quote,
      author: quotes.quotes[rndInt].author
    }
  }

  @Get('topAuthor')
  @Render('table')
  topAuthors() {
    const dict = new Map();
    for (let index = 0; index < quotes.quotes.length; index++) {
      if (dict.has(quotes.quotes[index].author)) {
        let num = dict.get(quotes.quotes[index].author);
        num++;
        dict.set(quotes.quotes[index].author, num);
      }
      else {
        dict.set(quotes.quotes[index].author, 1)
      }
    }
    return {
      dict
    }
  }


  @Get('quote/:id')
  @Render('quote')
  oneQuote(@Param('id') id: number) {
    for (let index = 0; index < quotes.quotes.length; index++) {
      if (quotes.quotes[index].id == id) {
        return {
          quote: quotes.quotes[index].quote,

        }
      }
    }
  }

  @Get('deleteQuote/:id')
  @Render('delete')
  deleteQuote(@Param('id') id: number) {
    for (let index = 0; index < quotes.quotes.length; index++) {
      if (quotes.quotes[index].id == id) {
        quotes.quotes.splice(index, 1);  
        return {
          message: 'Sikeres törlés'
        }
      }
      return {
        message: 'Ismeretlen idézet'
      }
    }
  }

  @Get('quote')
  @Render('kereses')
  searchQuote(@Query('search') search: string) {
    const allQuote = [];
    for (let index = 0; index < quotes.quotes.length; index++) {
      if (quotes.quotes[index].quote.toLowerCase().includes(search.toLowerCase())) {
        allQuote.push(quotes.quotes[index]);
      }
    }
    console.log(allQuote);
    return {
      allQuote
    }
  }

  @Get('authorRadnomForm')
  @Render('authorRandomForm')
  authorRandomForm() {
    
  }

  /*
  @Get('hatterszin')
  @Render('hatter')
  hatterszin(@Query('bgColor') bgColor:string = '#0000ff'){
    return {
      bgColor
    }
  }
 
  #jegkremek = [
    {nev: 'Vanília', ar: 200},
    {nev: 'Csoki', ar: 250},
    {nev: 'Eper', ar: 300},
  ]
 
  @Get('jegkrem')
  @Render('jegkremLista')
  jegkremLista(){
    return {
      jegkremek: this.#jegkremek
    }
  }
 
  @Get('jegkrem/:id')
  @Render('jegkrem')
  jegkrem(@Param('id') id: string){
    return {
      id,
      nev: 'CitromosCsoda',
      ar: 1000
   }*/
}
