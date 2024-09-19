import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { quotes } from './quotes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('quotes')
  @Render('index')
  getProfile(){
    return {
      quotes: quotes.quotes
    }
  }

  randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  @Get('randomQuote')
  @Render('random')
  randomQuote(){
    const rndInt = this.randomIntFromInterval(0,29);
    return {
      quote: quotes.quotes[rndInt].quote,
      author: quotes.quotes[rndInt].author
    }
  }

  @Get('topAuthor')
  @Render('table')
  topAuthors(){
    const dict = new Map();
    for (let index = 0; index < quotes.quotes.length; index++) {
      if(dict.has(quotes.quotes[index].author)){
        let num = dict.get(quotes.quotes[index].author);
        num++;
        dict.set(quotes.quotes[index].author, num);
      }
      else{
        dict.set(quotes.quotes[index].author, 1)
      }
    }
    return {
      dict
    }
  }
}
