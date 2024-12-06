import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class GifsService {
  private _tagHistory: string[] = [];
  private apiKey: string = '8PJzzWBGe1h02cHjDT1V4pk1U1tpRGbk';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http:HttpClient) {}

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
  }

  async searchTag( tag: string ):Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params= new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q',tag)

    // 'https://api.giphy.com/v1/gifs/search?api_key=8PJzzWBGe1h02cHjDT1V4pk1U1tpRGbk&q=valorant&limit=10'
    this.http.get(`${this.serviceUrl}/search`, { params })
      .subscribe( resp => {
        console.log(resp);
      } )


  }
}
