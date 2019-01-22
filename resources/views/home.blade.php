@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Sign Up</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    Sign Up Successfull
                    <form action="/chat" method="GET">
                        <button type="submit" class="btn btn-lg btn-primary">Start Chatting</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
