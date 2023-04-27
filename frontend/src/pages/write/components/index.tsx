import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
    title: string;
    price: number;
    description: string;
    startDate: string;
    endDate: string;
};

function TextInput() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = data => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Name:
                <input type="text" {...register('title', { required: true })} />
                {errors.title && <span>This field is required</span>}
            </label>
            <label>
                Price:
                <input type="number" {...register('price', { required: 'Price is required' })} />
                {errors.price && <span>{errors.price.message}</span>}
            </label>

            <label>
                Description:
                <input type="text" {...register('description', { required: 'Description is required' })} />
                {errors.description && <span>{errors.description.message}</span>}
            </label>

            <label>
                Start Date:
                <input type="date" {...register('startDate', { required: 'Start date is required' })} />
                {errors.startDate && <span>{errors.startDate.message}</span>}
            </label>

            <label>
                End Date:
                <input type="date" {...register('endDate', { required: 'End date is required' })} />
                {errors.endDate && <span>{errors.endDate.message}</span>}
            </label>

            <button type="submit">Submit</button>
        </form>
    );
}

export default TextInput;
