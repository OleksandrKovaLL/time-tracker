'use client';

import TimeEntryForm from '@/components/TimeEntryForm';
import EntryHistory from '@/components/EntryHistory';
import { Toaster } from 'react-hot-toast';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {useTimeEntries} from "@/hooks/useTimeEntries";

export default function Home() {

  const { entries, isLoading, isFetching, createEntry, deleteEntry } = useTimeEntries();

  return (
      <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
        <Toaster
            position="top-right"
            toastOptions={{
              success: {
                duration: 3000,
                style: {
                  background: '#10b981',
                  color: '#fff',
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: '#ef4444',
                  color: '#fff',
                },
              },
            }}
        />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Clock className="h-10 w-10 text-black" />
              <h1 className="text-5xl font-bold bg-linear-to-r from-black bg-clip-text">
                Time Tracker
              </h1>
            </div>
            <p className="text-gray-600">Track your time efficiently across projects</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div>
              <TimeEntryForm onSubmit={createEntry} isLoading={isLoading} />
            </div>

            {/* History */}
            <div>
              {isFetching ? (
                  <Card>
                    <CardContent className="p-12">
                      <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                        <p className="text-gray-500">Loading entries...</p>
                      </div>
                    </CardContent>
                  </Card>
              ) : (
                  <EntryHistory entries={entries} onDelete={deleteEntry} />
              )}
            </div>
          </div>
        </div>
      </main>
  );
}