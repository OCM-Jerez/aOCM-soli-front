import {NgModule,Component,OnInit,Input,Output,EventEmitter,forwardRef,ChangeDetectorRef,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const RATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PratingComponent),
  multi: true
};


@Component({
  selector: 'app-prating',
  templateUrl: './prating.component.html',
styleUrls: ['./prating.component.scss'],

providers: [RATING_VALUE_ACCESSOR],
changeDetection: ChangeDetectionStrategy.OnPush,
encapsulation: ViewEncapsulation.None,

  })

export class PratingComponent implements OnInit,ControlValueAccessor {
    @Input() disabled: boolean;
    @Input() readonly: boolean;
    @Input() stars: number = 5;
    @Input() cancel: boolean = true;
    @Input() iconOnClass: string = 'pi pi-star';
    @Input() iconOnStyle: any;
    @Input() iconOffClass: string = 'pi pi-star-o';
    @Input() iconOffStyle: any;
    @Input() iconCancelClass: string = 'pi pi-ban';
    @Input() iconCancelStyle: any;

    @Output() onRate: EventEmitter<any> = new EventEmitter();
    @Output() onCancel: EventEmitter<any> = new EventEmitter();

    constructor(private cd: ChangeDetectorRef) {}

    value?: number | null ;
    onModelChange: Function = () => {};
    onModelTouched: Function = () => {};

    public starsArray?: number[];

    ngOnInit() {
        this.starsArray = [];
        for(let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    }

    rate(event: { preventDefault: () => void; }, i: number): void {
        if (!this.readonly&&!this.disabled) {
            this.value = (i + 1);
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onRate.emit({
                originalEvent: event,
                value: (i+1)
            });
        }
        event.preventDefault();
    }

    clear(event: { preventDefault: () => void; }): void {
        if (!this.readonly&&!this.disabled) {
            this.value = null;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onCancel.emit(event);
        }
        event.preventDefault();
    }

    writeValue(value: any) : void {
        this.value = value;
        this.cd.detectChanges();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
        this.cd.markForCheck();
    }
}

// @NgModule({
//     imports: [CommonModule],
//     exports: [PratingComponent],
//     declarations: [PratingComponent]
// })
// export class RatingModule { }

