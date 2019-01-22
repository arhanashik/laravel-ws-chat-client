@extends('layouts.App')

@section('content')
    <div class="container">
        <div class="row">
            <form action="/register" method="post">
                @csrf
                <div class="row">
                    <input type="text" class="form-control" id="name" placeholder="Your name" />
                </div>
                <br>
                <div class="row">
                    <input type="email" class="form-control" id="email" placeholder="Your email" />
                </div>
                <br>
                <div class="row">
                    <input type="password" class="form-control" id="password" placeholder="Your password"/>
                </div>
                <br>
                <div class="row">
                    <button type="submit" class="btn btn-primary" id="signup">Sign Up</button>
                </div>
            </form>
        </div>
    </div>
@endsection