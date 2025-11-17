<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    //
    public function index()
    {
        $category = Category::get();
        
        return Inertia::render('blog/category',[
            'categories'=>$category
        ]);

    }
    public function show($slug)
    {

    }
}
