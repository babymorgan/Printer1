import { Injectable, Pipe, PipeTransform, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Pipe({
    name: 'sum'
})
@Injectable()
export class SumPipe implements PipeTransform {
    transform(items: any[], arg: string): number {
        let total: number = 0;
        if(items != undefined){
            items.forEach(item => total += item[arg]);
            return total;
        }else{
            return 0;
        }
      
    }
}



@Pipe({
    name: 'sumReturnString'
})
@Injectable()
export class SumReturnStringPipe implements PipeTransform {
    transform(items: any[], arg: string): string {
        let total: number = 0;
        items.forEach(item => total += item[arg]);

        let p = new DecimalPipe("en-US"); //en-US determine languageTag, Cannot be emtpy
        return p.transform(total);
    }
}

@Pipe({
    name: 'sumWithIndex'
})
@Injectable()
export class SumWithIndexPipe implements PipeTransform {
    transform(items: any[], arg: string, idx: number): number {
        let total: number = 0;
        items.forEach(item => total += item[arg][idx]);
        return total;
    }
}
@Pipe({
    name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], arg1: string, arg2: any): any[] {
        if (items) {
            if (arg2 == '' || arg2 == null || arg2 == undefined) {
                return items;
            }
            else {
                return items.filter(item => item[arg1] == arg2);
            }
        }
        else {
            return [];
        }
    }
}

@Pipe({
    name: 'filterByTerm'
})
@Injectable()
export class FilterByTermPipe implements PipeTransform {
    transform(items: any[], arg1: string, arg2: any): any[] {
        if (items) {
            if (arg2 == '' || arg2 == null || arg2 == undefined) {
                return items;
            }
            else {
                return items.filter(item => item[arg1].indexOf(arg2) > -1);
            }
        }
        else {
            return [];
        }
    }
}
@Pipe({
    name: 'filterByArray'
})
@Injectable()
export class FilterByArrayPipe implements PipeTransform {
    transform(items: any[], arg1: string[], arg2: any): any[] {
        if (items) {
            if (arg2 == '' || arg2 == null || arg2 == undefined) {
                return items;
            }
            else {
                let result: any[] = [];
                for (let _i = 0; _i < arg1.length; _i++) {
                    let a = items.filter(item => item[arg1[_i]].indexOf(arg2) > -1);
                    result = result.concat(a);
                }

                return result;
            }
        }
        else {
            return [];
        }
    }
}

@Pipe({
    name: 'FilterByName'
})
@Injectable()
export class FilterByName implements PipeTransform {
    transform(items: any[], args: any): any {
        if (args[0] === undefined || args === '') {
            return items;
        }
        return items.filter(item => item.Name.toLowerCase().indexOf(args.toLowerCase()) !== -1);
    }
}
@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
    transform(items: any[], args: string): any {
        if (!args || args.trim() == "") {
            return items;
        }
        return Array.from(items).sort((item1: any, item2: any) => {
            return this.orderByComparator(item1[args], item2[args]);
        });

    }

    orderByComparator(a: any, b: any): number {

        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            //Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
        }
        else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b)) return -1;
            if (parseFloat(a) > parseFloat(b)) return 1;
        }

        return 0; //equal each other
    }
}
@Pipe({
    name: 'MinToMax'
})
@Injectable()
export class MinToMaxPipe implements PipeTransform {
    transform(items: any[], args: string): any {
        if (items.length > 0) {
            let min: number = items[0][args];
            let p = new DecimalPipe("en-US"); //en-US determine languageTag, Cannot be emtpy
            if (items.length > 1) {
                let max: number = items[items.length - 1][args];
                if (max == min) {
                    return p.transform(min);
                }
                else {
                    return p.transform(min) + ' - ' + p.transform(max);
                }
            } else {
                return p.transform(min);
            }
        } else {
            return '-';
        }
    }
}


@Pipe({
    name: 'limitTo'
})
export class TruncatePipe {
    transform(value: string, args: string): string {
        // let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
        // let trail = args.length > 1 ? args[1] : '...';
        let limit = args ? parseInt(args, 10) : 10;
        let trail = '...';

        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}

@Pipe({
    name: 'newlines'
})
export class NewLinesPipe {
    transform(value: string): string {
        if (value == null) {
            return '';
        }
        return value.replace(/(?:\r\n|\r|\n)/g, '<br />');

    }
}
@Pipe({
    name: 'filterNotNull'
})
export class FilterNotNullPipe {
    transform(input: any[], prop: string): any[] {

        return input.filter(x => x[prop] != null);

    }
}

@Pipe({
    name: 'find'
})
export class FindPipe {
    transform(input: any[], prop: string, val: any): any {
        let res: any = input.find(x => x[prop] == val);
        if (res == null) {
            return {};

        }
        return res;

    }
}

@Pipe({
    name: 'getchildren'
})
export class GetChildrenPipe {
    transform(items: any[], prop: string): any[] {
        let data: any = [];

        items.forEach(item => {
            item[prop].forEach(value => {
                data.push(value);
            })
        });
        return data;
    }
}

@Pipe({
    name: 'genamefromid'
})
export class GetNameFromIDPipe {
    transform(items: any[], ID: string, prop: string): string {
        if (items.length > 0) {
            var result = items[0][prop];;
            items.forEach(item => {
                if (item.ID == ID) result = item[prop];
            })
            return result;
        }
    }
}
@Pipe({
    name: 'ismindate'
})
export class IsMinDatePipe {
    transform(input: any, format?: string): string {
        if (input) {
            let p = new DatePipe('en-US');
            format = format || "dd/MM/yyyy";
            if (input != "0001-01-01T00:00:00") {
                //return $filter("date")(input, format)
                return p.transform(input, format);
            }
            return "-";
        }
    }
}
@Pipe({
    name: 'groupBy'
})
export class GroupBy {
    transform(value: Array<any>, field: string): Array<any> {
        if (value) {
            const groupedObj = value.reduce((prev, cur) => {
                if (!prev[cur[field]]) {
                    prev[cur[field]] = [cur]
                } else {
                    prev[cur[field]].push(cur);
                }

                return prev;
            }, {});

            return Object.keys(groupedObj).map(key => ({
                key,
                value: groupedObj[key]
            }));
        } else {
            return null;
        }
    }
}

@Pipe({
    name: 'stringfy'
})
@Injectable()
export class StringfyPipe implements PipeTransform {
    transform(items: any): string {

        return JSON.stringify(items);
    }
}

@Pipe({
    name: 'max'
})
@Injectable()
export class MaxPipe implements PipeTransform {
    transform(items: any[], prop: string): number {
        if (!Array.isArray(items) || items.length === 0 || !prop) {
            return 0;
        }
        items.sort((a, b) => b[prop] - a[prop]);
        return items[0][prop];
    }
}

@Pipe({
    name: 'firstLetter'
})
@Injectable()
export class firsLetterPipe implements PipeTransform {
    transform(item: string): string {
        let index = item.indexOf('/');
        if (index > -1) {
            item = item.substring(0, index);
        }
        let acronym = item.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '');
        if (acronym.length > 3) {
            acronym.slice(0, 3);
        }
        return acronym.toUpperCase();
    }
}

@NgModule({
    declarations: [FilterByName, TruncatePipe, SumPipe, OrderByPipe, FilterPipe, NewLinesPipe,
        FilterByTermPipe, MinToMaxPipe, FilterByArrayPipe, SumWithIndexPipe, FilterNotNullPipe, FindPipe, GetChildrenPipe, GetNameFromIDPipe, IsMinDatePipe,
        SumReturnStringPipe, GroupBy, StringfyPipe, MaxPipe, firsLetterPipe],
    imports: [CommonModule, FormsModule],
    exports: [FilterByName, TruncatePipe, SumPipe, OrderByPipe, FilterPipe, NewLinesPipe,
        FilterByTermPipe, MinToMaxPipe, FilterByArrayPipe, SumWithIndexPipe, FilterNotNullPipe, FindPipe, GetChildrenPipe, GetNameFromIDPipe, IsMinDatePipe,
        SumReturnStringPipe, GroupBy, StringfyPipe, MaxPipe, firsLetterPipe],
    providers: [FilterByName, TruncatePipe, SumPipe, OrderByPipe, FilterPipe, NewLinesPipe,
        FilterByTermPipe, MinToMaxPipe, FilterByArrayPipe, SumWithIndexPipe, FilterNotNullPipe, FindPipe, GetChildrenPipe, GetNameFromIDPipe, IsMinDatePipe,
        SumReturnStringPipe, GroupBy, StringfyPipe, MaxPipe, DecimalPipe, DatePipe, firsLetterPipe],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PipeModule { }

