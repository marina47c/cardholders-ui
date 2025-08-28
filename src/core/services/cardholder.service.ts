import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { AddCardholderDto, CardholderDto, EditCardholderDto, PagedResponse } from "../../models/cardholders";
import { environment } from "../../environments/environment";
import { tap } from "rxjs";

@Injectable ({ providedIn: 'root' })
export class CardholderService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getCardholders(page = 1, pageSize = 20) {
        const params = new HttpParams()
            .set('page', page)
            .set('pageSize', pageSize);

        return this.http.get<PagedResponse<CardholderDto>>(`${this.baseUrl}/cardholders/`, { params })
            .pipe(tap(
                res => console.info(res)
            ));
    }

    addCardholder(cardholder: AddCardholderDto) {
        return this.http.post(`${this.baseUrl}/cardholders`, cardholder);
    }

    editCardholder(cardholder: EditCardholderDto, id: number) {
        return this.http.put(`${this.baseUrl}/cardholders/${id}`, cardholder);
    }

    deleteCardholder(id: number) {
        return this.http.delete(`${this.baseUrl}/cardholders/${id}`);
    }
}