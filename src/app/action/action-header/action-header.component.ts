import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { AbstractAction } from "../../model/actions/abstractAction";

@Component({
  selector: "app-action-header",
  templateUrl: "./action-header.component.html",
  styleUrls: ["./action-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionHeaderComponent {
  @Input() action: AbstractAction;
  @Input() quantity: Decimal;

  constructor() {
    //
  }
}