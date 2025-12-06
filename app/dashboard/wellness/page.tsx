import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, TrendingUp, Activity } from "lucide-react";

export default function WellnessPage() {
  const moodData = [
    { day: "Mon", mood: 7, stress: 4 },
    { day: "Tue", mood: 6, stress: 6 },
    { day: "Wed", mood: 8, stress: 3 },
    { day: "Thu", mood: 7, stress: 5 },
    { day: "Fri", mood: 9, stress: 2 },
    { day: "Sat", mood: 9, stress: 1 },
    { day: "Sun", mood: 8, stress: 2 },
  ];

  const goals = [
    { title: "Daily Meditation", streak: 12, target: "Daily" },
    { title: "Exercise 3x/week", completed: 2, target: 3 },
    { title: "Sleep 7+ hours", streak: 5, target: "Daily" },
    { title: "Work-Life Balance", status: "On Track" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Mental Health & Wellness
          </h1>
          <p className="mt-1 text-gray-600">
            Track your well-being and prevent burnout
          </p>
        </div>
        <Button>
          <Heart className="mr-2 h-4 w-4" />
          Log Mood
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Mood
            </CardTitle>
            <Heart className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.7/10</div>
            <p className="text-xs text-green-600">+0.8 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Stress Level
            </CardTitle>
            <Activity className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.3/10</div>
            <p className="text-xs text-green-600">-1.2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Check-in Streak
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-gray-600">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Burnout Risk
            </CardTitle>
            <Brain className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Low</div>
            <p className="text-xs text-gray-600">Healthy balance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Mood Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Mood Tracker</CardTitle>
            <CardDescription>
              Your mood and stress levels this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moodData.map((data, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{data.day}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-green-600">
                        Mood: {data.mood}/10
                      </span>
                      <span className="text-orange-600">
                        Stress: {data.stress}/10
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-2 flex-1 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${data.mood * 10}%` }}
                      />
                    </div>
                    <div className="h-2 flex-1 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-orange-500"
                        style={{ width: `${data.stress * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wellness Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Wellness Goals</CardTitle>
            <CardDescription>
              Your personal health and wellness targets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {goals.map((goal, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg border border-gray-100 p-4"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={goal.streak ? goal.streak > 0 : false}
                      readOnly
                    />
                    <div>
                      <p className="font-medium text-gray-900">{goal.title}</p>
                      {goal.streak !== undefined && (
                        <p className="text-sm text-gray-600">
                          {goal.streak} day streak
                        </p>
                      )}
                      {goal.completed !== undefined && (
                        <p className="text-sm text-gray-600">
                          {goal.completed}/{goal.target} this week
                        </p>
                      )}
                    </div>
                  </div>
                  {goal.status && (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      {goal.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Wellness Coach */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🧠</span>
            <span>AI Wellness Coach</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900">
                🎉 Great Progress!
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Your stress levels have decreased significantly this week. Keep
                up your meditation practice—it&apos;s working!
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900">
                💤 Sleep Recommendation
              </p>
              <p className="mt-1 text-sm text-gray-600">
                You&apos;re averaging 7.5 hours of sleep. Perfect! Maintain
                this schedule to optimize your productivity.
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-gray-900">
                🌟 Founder Self-Care
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Remember: taking care of yourself isn&apos;t selfish—it&apos;s
                essential for your startup&apos;s success. Schedule some &quot;me
                time&quot; this week.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

