<?php

namespace App\Http\Controllers\Api;

use App\Models\ActivityLog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ActivityLogController extends Controller
{
    public function index(Request $request) {
        $logs = ActivityLog::where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);

        return response()->json(
            $logs
        );
    }
}
