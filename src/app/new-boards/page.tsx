'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';  // Add this import at the top of the file

interface Board {
  id: string;
  name: string;
  description: string;
}

export default function NewBoardsPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const fetchBoards = useCallback(async () => {
    try {
      const response = await fetch('/api/boards');
      if (!response.ok) {
        throw new Error('Failed to fetch boards');
      }
      const data = await response.json();
      
      // Type guard to ensure data is an array of Board
      if (Array.isArray(data) && data.every(item => isBoard(item))) {
        setBoards(data);
      } else {
        console.error('Fetched data is not in the expected format');
        setBoards([]);
      }
    } catch (error) {
      console.error('Error fetching boards:', error);
      setBoards([]);
    }
  }, []);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const handleAddBoard = async () => {
    if (!newBoardName) return;

    const newBoard: Board = {
      name: newBoardName,
      description: newBoardDescription,
      id: ''
    };

    setBoards([...boards, newBoard]);
    setNewBoardName('');
    setNewBoardDescription('');

    await saveBoards([...boards, newBoard]);
  };

  const saveBoards = async (boardsToSave: Board[]) => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      const response = await fetch('/api/new-boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ boards: boardsToSave }),
      });
      if (!response.ok) {
        throw new Error('Failed to save boards');
      }
      setSaveMessage('Boards saved successfully');
    } catch (error) {
      console.error('Error saving boards:', error);
      setSaveMessage('Failed to save boards');
    } finally {
      setIsSaving(false);
    }
  };

  // Type guard function to check if an item is a Board
  function isBoard(item: any): item is Board {
    return (
      typeof item === 'object' &&
      item !== null &&
      typeof item.id === 'string' &&
      typeof item.name === 'string'
      // Add checks for other required properties
    );
  }

  const createBoard = () => {
    if (!newBoardName) return;

    const newBoard: Board = {
      id: uuidv4(), // Generate a unique ID
      name: newBoardName,
      description: newBoardDescription,
    };

    setBoards([...boards, newBoard]);
    setNewBoardName('');
    setNewBoardDescription('');
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">New Boards</h1>
      <Card className="bg-[#313450]">
        <CardHeader>
          <CardTitle className="text-white">Create New Board</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Board Name"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              className="bg-[#1e293b] text-white"
            />
            <Input
              placeholder="Board Description"
              value={newBoardDescription}
              onChange={(e) => setNewBoardDescription(e.target.value)}
              className="bg-[#1e293b] text-white"
            />
            <Button onClick={handleAddBoard} disabled={isSaving}>
              Add Board
            </Button>
          </div>
        </CardContent>
      </Card>
      {saveMessage && (
        <p className={saveMessage.includes('success') ? 'text-green-500' : 'text-red-500'}>
          {saveMessage}
        </p>
      )}
      <div className="space-y-4">
        {boards.map((board) => (
          <Card key={board.id} className="bg-gray-800 text-white mb-4">
            <CardHeader>
              <CardTitle>{board.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white">{board.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}