'use client'
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from '@/lib/shopify/utils';
import { useState } from "react";
import { useEffect } from "react";


export default function Search() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        setSearchValue(searchParams?.get('q') || '');
    }, [searchParams, setSearchValue]);
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        /**
         * Form Submission: If you have an event listener on a form's submit event, calling e.preventDefault(); 
         * within that event listener will prevent the form from actually submitting. 
         * This is useful when you want to validate the form or handle the submission with JavaScript 
         * (e.g., sending the form data via AJAX) instead of the default browser behavior.
         */
        e.preventDefault();
        /**
         * Type Assertion: The as HTMLFormElement part is a TypeScript type assertion. 
         * It tells the TypeScript compiler to treat e.target as an instance of HTMLFormElement. 
         * This is useful when you know the specific type of the DOM element you're working with, 
         * and you want to inform TypeScript about it, so you can safely access its properties and methods without TypeScript complaining.
         */
        const val = e.target as HTMLFormElement;
        const search = val.search as HTMLInputElement;
        const newParams = new URLSearchParams(searchParams.toString())
        if (search.value) {
            newParams.set('q', search.value)
        } else {
            newParams.delete('q');
        }
        router.push(createUrl('/search', newParams));
    }

    return (
        <form onSubmit={onSubmit} className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
            <Input
                type="search"
                name="search"
                autoComplete="off"
                placeholder="Search for products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
                <MagnifyingGlassIcon className="h-4" />
            </div>
        </form>
    );
}