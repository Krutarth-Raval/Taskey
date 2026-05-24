<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Illuminate\Auth\Notifications\ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
            return rtrim($frontendUrl, '/').'/reset-password?token='.$token.'&email='.$notifiable->getEmailForPasswordReset();
        });

        \Illuminate\Support\Facades\Mail::extend('brevo', function (array $config) {
            return (new \Symfony\Component\Mailer\Bridge\Brevo\Transport\BrevoTransportFactory)->create(
                new \Symfony\Component\Mailer\Transport\Dsn(
                    'brevo+api',
                    'default',
                    $config['key']
                )
            );
        });
    }
}
