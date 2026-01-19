<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // Check if columns don't exist before adding them
        // This migration is kept for backwards compatibility with existing databases
        if (!Schema::hasColumn('daily_logs', 'approved_by')) {
            Schema::table('daily_logs', function (Blueprint $table) {
                $table->foreignId('approved_by')
                    ->nullable()
                    ->after('status')
                    ->constrained('users')
                    ->cascadeOnDelete();
                $table->timestamp('approved_at')->nullable()->after('approved_by');
                $table->text('supervisor_comment')->nullable()->after('approved_at');
            });
        } else {
            // If columns exist, make them nullable (for existing databases)
            DB::statement('ALTER TABLE daily_logs ALTER COLUMN approved_by DROP NOT NULL');
            DB::statement('ALTER TABLE daily_logs ALTER COLUMN approved_at DROP NOT NULL');
            DB::statement('ALTER TABLE daily_logs ALTER COLUMN supervisor_comment DROP NOT NULL');
            
            // Change approved_at from date to timestamp if needed
            Schema::table('daily_logs', function (Blueprint $table) {
                $table->timestamp('approved_at')->nullable()->change();
            });
        }
    }

    public function down(): void
    {
        Schema::table('daily_logs', function (Blueprint $table) {
            if (Schema::hasColumn('daily_logs', 'approved_by')) {
                $table->dropForeign(['approved_by']);
                $table->dropColumn([
                    'approved_by',
                    'approved_at',
                    'supervisor_comment'
                ]);
            }
        });
    }
};
