import InputError from '@/components/input-error';
import { Feedback } from '@/types';
import { Head } from '@inertiajs/react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export default function Index() {
    const VALIDATION_ERROR: number = 422;
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    const [data, setData] = useState<{ customer_name: string; message: string; rating?: string }>({
        customer_name: '',
        message: '',
        rating: '',
    });

    const [processing, setProcessing] = useState<boolean>(false);

    const [rating, setRating] = useState<string>('all');

    const [errors, setErrors] = useState({
        customer_name: [],
        message: [],
        rating: [],
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.target.value;

        changeValue(key, value);
    };

    const changeValue = (key: string, value: string) => {
        setData((values) => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setProcessing(true);

        const response = await fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === VALIDATION_ERROR) {
            setErrors({
                ...JSON.parse(await response.text()),
            });
        }

        if (response.ok) {
            setFeedbacks([JSON.parse(await response.text()).data, ...feedbacks]);

            clearForm();
        }

        setProcessing(false);
    };

    useEffect(() => {
        fetchFeedbacks();
    }, [rating]);

    const fetchFeedbacks = async () => {
        const response = await fetch(`/api/feedback?rating=${rating}`);

        const result = await response.json();

        setFeedbacks(result.data);
    };

    const clearForm = () => {
        setData({
            customer_name: '',
            message: '',
            rating: '',
        });
    };

    const changeRating = (value: string) => {
        setRating(value);
    };

    return (
        <div className="p-24">
            <Head title="Feedbacks" />

            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">New Feedback</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Please fill in form below.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Customer Name
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <input
                                            id="customer_name"
                                            type="text"
                                            value={data.customer_name}
                                            onChange={handleChange}
                                            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                        />
                                    </div>
                                    {errors.customer_name && <InputError message={errors.customer_name[0]} />}
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                                    Message
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="message"
                                        rows={4}
                                        value={data.message}
                                        onChange={(e) => changeValue('message', e.target.value)}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    {errors.message && <InputError message={errors.message[0]} />}
                                </div>
                                <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences for your feedback.</p>
                            </div>

                            <div className="col-span-full">
                                <select
                                    id="rating"
                                    value={data.rating}
                                    onChange={(e) => changeValue('rating', e.target.value)}
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option value="">Select Rating</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                {errors.rating && <InputError message={errors.rating[0]} />}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    disabled={processing}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="border-grey-500 mt-12 text-2xl">Feedbacks</div>

            <div className="mt-4 flex">
                <div className="flex-1/2">
                    <label htmlFor="rating" className="text-sm">
                        Filter Rating
                    </label>
                    <select
                        id="rating"
                        value={rating}
                        onChange={(e) => changeRating(e.target.value)}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                        <option value="all">All</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            {feedbacks?.length === 0 && <div className="mt-8 text-lg">No Feedback.</div>}
            <ul role="list" className="divide-y divide-gray-100">
                {feedbacks.map((feedback) => (
                    <li key={feedback.id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <img alt="" className="size-12 flex-none rounded-full bg-gray-50" />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm/6 font-semibold text-gray-900">{feedback.customer_name}</p>
                                <p className="mt-1 truncate text-sm text-gray-500">{feedback.message}</p>
                                <p className="mt-1 truncate text-xs text-gray-500">{feedback.date}</p>
                            </div>
                        </div>
                        {feedback.rating && (
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm/6 text-gray-900">Rating: {feedback.rating} / 5</p>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
