import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgFormControl} from 'angular2/common';
import {Order} from '../../models';
import {CheckoutService} from '../../services/checkout/checkout.service';
import {RouteParams, Router, CanActivate} from 'angular2/router';
import {Routes} from '../../route.config';
import {tokenNotExpired} from 'angular2-jwt';


@Component({
    selector: 'checkout',
    templateUrl: 'app/components/checkout/checkout.component.html',
    styleUrls: ['app/components/checkout/checkout.component.css'],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm, NgFormControl]
})
@CanActivate(() => tokenNotExpired())
export class CheckoutComponent {
    states = ['NSW', 'VIC', 'TAS', 'WA', 'SA', 'NT', 'QLD'];
    public submitted = false;

    constructor(private _checkoutService: CheckoutService,
        private _routeParams: RouteParams, private _router: Router) {
    }

    model = new Order();

    onSubmit() {
        console.log(JSON.stringify(this.model));
        this._checkoutService.postOrder(this.model).
            subscribe((order) => {
                toastr.success(`successfully added order`);
                this._router.navigate([`/${Routes.orders.as}`]);
            });

        this.submitted = true;
    }
}
