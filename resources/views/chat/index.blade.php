@extends('layouts.App')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 message-area" id="message-area"></div>
            <div class="col-md-4" >
                <h3>Online users<h3>
                <ul id="connection-area"></ul>
            </div>
        </div>
        <div class="row">
            <span id="status">Connecting...</span>
            <input class="form-control" name="message" id="message" />
        </div>
        <div class="row">
            <button class="btn btn-sm btn-primary" id="send">Send Message</button>
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
            <button class="btn btn-primary" id="validate">Log In</button>
        </div>
    </div>
@endsection