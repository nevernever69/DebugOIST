import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Users, Settings, Activity, Plus, BarChart3, Bell, Clock, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const AdminPage = () => {
    const stats = [
        {
            title: 'Total Events',
            value: '12',
            change: '+2 this month',
            icon: Calendar,
            color: 'text-blue-400',
            link: '/admin/events'
        },
        {
            title: 'Active Members',
            value: '156',
            change: '+8 this week',
            icon: Users,
            color: 'text-indigo-400',
            link: '/admin/members'
        },
        {
            title: 'Pending Approvals',
            value: '8',
            change: '3 urgent',
            icon: Bell,
            color: 'text-amber-400',
            link: '/admin/registrations'
        },
        {
            title: 'Upcoming Events',
            value: '5',
            change: 'Next in 3 days',
            icon: Clock,
            color: 'text-emerald-400',
            link: '/admin/events'
        }
    ]

    const recentActivity = [
        {
            title: 'New Event Registration',
            description: 'Team "Code Warriors" registered for Hackathon 2024',
            time: '2 hours ago',
            type: 'registration'
        },
        {
            title: 'Event Created',
            description: 'New workshop "Web Development Basics" added',
            time: '5 hours ago',
            type: 'event'
        },
        {
            title: 'Member Joined',
            description: 'John Doe joined as a new member',
            time: '1 day ago',
            type: 'member'
        }
    ]

    return (
        <section className='min-h-screen w-full px-4 py-6 antialiased sm:px-6 lg:px-8 bg-black'>
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute top-32 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
                <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
            </div>
            <div className="flex flex-col space-y-6 max-w-7xl mx-auto relative my-10">
                <div className="relative">
                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400'>
                        Admin Dashboard
                    </h1>
                    <p className="mt-2 text-zinc-400">Welcome back! Here's what's happening with your organization.</p>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <Link href={stat.link} key={index}>
                            <Card className="w-full bg-zinc-950/50 backdrop-blur-lg border-zinc-800 hover:border-blue-500/50 transition-colors cursor-pointer">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-zinc-400">{stat.title}</p>
                                            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                                            <p className="text-sm text-zinc-500 mt-1">{stat.change}</p>
                                        </div>
                                        <div className={`p-3 rounded-full bg-zinc-900/50 ${stat.color}`}>
                                            <stat.icon className="w-6 h-6" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions and Recent Activity */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Quick Actions */}
                    <Card className="bg-zinc-950/50 backdrop-blur-lg border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Link href="/admin/events/new">
                                    <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create New Event
                                    </Button>
                                </Link>
                                <Link href="/admin/members">
                                    <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 hover:border-blue-500/50">
                                        <Users className="w-4 h-4 mr-2" />
                                        Manage Members
                                    </Button>
                                </Link>
                                <Link href="/admin/registrations">
                                    <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 hover:border-blue-500/50">
                                        <Activity className="w-4 h-4 mr-2" />
                                        Review Registrations
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="bg-zinc-950/50 backdrop-blur-lg border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50 transition-colors">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-semibold">{activity.title}</h4>
                                                <p className="text-sm text-zinc-400 mt-1">{activity.description}</p>
                                            </div>
                                            <span className="text-xs text-zinc-500">{activity.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Analytics Overview */}
                <Card className="bg-zinc-950/50 backdrop-blur-lg border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Analytics Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50 transition-colors">
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-blue-400" />
                                    <h3 className="font-semibold">Event Participation</h3>
                                </div>
                                <div className="mt-4 h-32 flex items-center justify-center">
                                    <p className="text-zinc-400">Chart coming soon</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50 transition-colors">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                                    <h3 className="font-semibold">Member Growth</h3>
                                </div>
                                <div className="mt-4 h-32 flex items-center justify-center">
                                    <p className="text-zinc-400">Chart coming soon</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/50 transition-colors">
                                <div className="flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-purple-400" />
                                    <h3 className="font-semibold">Registration Trends</h3>
                                </div>
                                <div className="mt-4 h-32 flex items-center justify-center">
                                    <p className="text-zinc-400">Chart coming soon</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default AdminPage 