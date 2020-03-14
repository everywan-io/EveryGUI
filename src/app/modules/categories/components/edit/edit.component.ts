import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ButtonStates } from '@modules/shared/components/button/button.component';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { CategoriesService } from '@modules/categories/categories.service';
import { Category } from '@models/categories.model';
import { TitleService } from '@services/title.service';

@Component({
    selector: 'app-categories-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class EditComponent implements OnInit {

    color: string;

    preview: string;

    colors = ['#ffb05a', '#4d78ff', '#ff4d5e', '#9c25f3', '#0aca56', '#6F6F6F'];

    form: FormGroup;
    mode: 'edit' | 'create';

    button: {
        state: ButtonStates,
        title: string;
    };

    constructor(private route: ActivatedRoute,
                private translator: TranslateService,
                private categoryService: CategoriesService,
                private router: Router,
                private notifications: NotificationsService,
                private title: TitleService) {

        this.button = {
            state: ButtonStates.DISABLED,
            title: 'categories.edit.actions.create'
        };

        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];

        this.preview = this.translator.instant('categories.edit.preview');
    }

    ngOnInit() {

        this.mode = this.route.snapshot.data['mode'];

        if (this.mode === 'edit') {
            this.preview = this.route.snapshot.data['category'].name;
            this.color = this.route.snapshot.data['category'].color;
        }


        this.form = this.defineForm(this.mode === 'edit');

        this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
        this.button.title = `categories.edit.actions.${this.mode}`;

        this.route.data.subscribe((data: Data) => this.form = this.defineForm(data['mode'] === 'edit'));

        this.form.statusChanges
            .subscribe(() => {

                if (this.form.get('name').value === '' || this.form.get('name').value === null) {
                    this.preview = 'Preview';
                } else {
                    this.preview = this.form.get('name').value;
                }

                this.button.state = this.form.valid ? ButtonStates.ACTIVE : ButtonStates.DISABLED;
            });

        this.title.set(`categories.edit.title.${this.route.snapshot.data['mode']}`);
    }

    onSubmit() {
        this.form.get('submitted').setValue(true);

        Object.keys(this.form.controls).forEach((field: string) => {
            this.form.get(field).markAsDirty();
            this.form.get(field).markAsTouched();
            this.form.updateValueAndValidity();
        });

        if (this.button.state !== ButtonStates.ACTIVE || this.form.invalid) {
            return;
        }

        // Sending data to backend
        const operation = this.mode === 'edit' ? 'update' : 'create';
        const payload = {
            name: this.form.get('name').value,
            description: this.form.get('description').value,
            color: this.form.get('color').value,
            id: this.form.get('id').value
        };

        if (this.mode !== 'edit') {
            delete payload.id;
        }

        this.button.state = ButtonStates.LOADING;
        this.categoryService[operation](payload)
            .subscribe(
                (category: Category) => {
                    this.router.navigate(['/categories']);
                    this.notifications.success(
                        this.translator.instant(`categories.edit.notifications.${this.mode}.title`),
                        this.translator.instant(`categories.edit.notifications.${this.mode}.message`, {category: category})
                    );
                },
                (error: any) => {
                    this.router.navigate(['/categories']);
                    this.notifications.error(
                        this.translator.instant(`categories.edit.notifications.${this.mode}.title`),
                        error.message
                    );
                }
            );
    }

    /* tslint:disable object-literal-key-quotes */
    private defineForm(edit: boolean): FormGroup {
        const category: Category = this.route.snapshot.data['category'];

        const initialFormValues = {
            id: edit ? category.id : null,
            name: edit ? category.name : null,
            description: edit ? category.description : null,
            color: edit ? category.color :  this.color,
        };

        return new FormGroup({
            'submitted': new FormControl(false, []),
            'id': new FormControl(initialFormValues.id, []),
            'name': new FormControl(initialFormValues.name, [Validators.required]),
            'description': new FormControl(initialFormValues.description, [Validators.required]),
            'color': new FormControl(initialFormValues.color, [Validators.required])
        });
    }

    onColorChange(color: string) {
        this.color = color;
        this.form.controls['color'].setValue(color);
    }

}
