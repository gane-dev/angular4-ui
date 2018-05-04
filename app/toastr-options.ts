// custom-option.ts
import { ToastOptions } from 'ng2-toastr';

export class CustomOption extends ToastOptions {
    dismiss = 'click'; // you can override any options available

}