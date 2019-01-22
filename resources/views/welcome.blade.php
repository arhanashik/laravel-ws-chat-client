@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <h2>Welcome to Chat-land</h2>
        </div>
        <div class="row">
            <form action="/chat" method="GET">
                <a class="btn btn-lg btn-primary" href="/register" style="color:white;">Sign Up</a>
                <button type="submit" class="btn btn-lg btn-primary">Start Chatting</button>
            </form>
        </div>
    </div>
@endsection