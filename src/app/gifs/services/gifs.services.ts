import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.intefaces';


@Injectable({ providedIn: 'root' })
export class GifsService {

  public gisfList: Gif[] = [];

  private _tagHistory: string[] = [];
  private apiKey: string = '8PJzzWBGe1h02cHjDT1V4pk1U1tpRGbk';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs servides ready');

    if(this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0])
  }

  get tagsHistory() {
    return [...this._tagHistory];
  }

  organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if (this.tagsHistory.includes(tag)) {
      this._tagHistory = this.tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void{
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage(): void{
    if( !localStorage.getItem('history')) return;
    this._tagHistory = JSON.parse(localStorage.getItem('history')!)
  }

  async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    // 'api.giphy.com/v1/gifs/search?q=valorant&api_key=Bj7q9sI9X8odJiI8RGzOdUd5Pvv0ve9n&limit=10'
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {

        this.gisfList = resp.data;
        console.log({ gifs: this.gisfList });

      })
  }
}
