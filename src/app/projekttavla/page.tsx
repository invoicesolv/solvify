'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, Filter, MoreHorizontal, Plus, Search, SortAsc } from "lucide-react"

interface Project {
  id: number;
  name: string;
  actionType: string;
  description: string;
  firstYearCosts: number;
}

interface Group {
  group_id: number;
  group_name: string;
  projects: Project[];
}

export default function ProjekttavlaPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      console.log('Fetching groups...');
      const response = await fetch('/api/projekttavla');
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch groups: ${response.status} ${response.statusText}. ${errorText}`);
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setGroups(data as Group[]);
    } catch (error) {
      console.error('Error fetching groups:', error);
      setError('Failed to load groups. Please try again.');
    }
  };

  const addNewGroup = async () => {
    const newGroupName = prompt('Enter new group name:');
    if (newGroupName) {
      try {
        console.log('Adding new group:', newGroupName);
        const response = await fetch('/api/projekttavla', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newGroupName, isNewGroup: true }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`Failed to add new group: ${response.status} ${response.statusText}. ${errorText}`);
        }

        const addedGroup = await response.json();
        console.log('Added group:', addedGroup);
        setGroups(prevGroups => [...prevGroups, addedGroup as Group]);
      } catch (error) {
        console.error('Error adding new group:', error);
        setError('Failed to add new group. Please try again.');
      }
    }
  };

  const addNewProject = async (groupId: number) => {
    const newProject: Project = {
      id: Date.now(),
      name: 'New Project',
      actionType: '',
      description: '',
      firstYearCosts: 0,
    };

    try {
      console.log('Adding new project:', { ...newProject, groupId });
      const response = await fetch('/api/projekttavla', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newProject, groupId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to add new project: ${response.status} ${response.statusText}. ${errorText}`);
      }

      const addedProject = await response.json();
      console.log('Added project:', addedProject);
      setGroups(prevGroups =>
        prevGroups.map(group =>
          group.group_id === groupId
            ? { ...group, projects: [...group.projects, addedProject as Project] }
            : group
        )
      );
    } catch (error) {
      console.error('Error adding new project:', error);
      setError('Failed to add new project. Please try again.');
    }
  };

  const handleCellEdit = async (groupId: number, projectId: number, field: keyof Project, value: string | number) => {
    setGroups(prevGroups =>
      prevGroups.map(group =>
        group.group_id === groupId
          ? {
              ...group,
              projects: group.projects.map(project =>
                project.id === projectId ? { ...project, [field]: value } : project
              )
            }
          : group
      )
    );

    try {
      console.log('Updating project:', { groupId, projectId, [field]: value });
      const response = await fetch('/api/projekttavla', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupId, projectId, [field]: value }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to update project: ${response.status} ${response.statusText}. ${errorText}`);
      }

      const updatedProject = await response.json();
      console.log('Updated project:', updatedProject);
    } catch (error) {
      console.error('Error updating project:', error);
      setError('Failed to update project. Please try again.');
    }
  };

  const calculateTotalCost = (projects: Project[]) => {
    return projects.reduce((total, project) => total + project.firstYearCosts, 0);
  };

  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#1e1e2e] text-white p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Cost-benefit Analysis</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <SortAsc className="w-4 h-4 mr-2" />
            Sort
          </Button>
          <Input
            placeholder="Search projects..."
            className="max-w-sm"
          />
        </div>
      </header>

      {groups.map((group) => (
        <div key={group.group_id} className="bg-[#2a2a3a] rounded-lg p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <ChevronDown className="w-5 h-5 mr-2" />
            {group.group_name}
          </h2>
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 py-2 text-left font-semibold border border-white/20">Objekt</TableHead>
                <TableHead className="px-4 py-2 text-left font-semibold border border-white/20">Action Type</TableHead>
                <TableHead className="px-4 py-2 text-left font-semibold border border-white/20">Description / Performance measure</TableHead>
                <TableHead className="px-4 py-2 text-right font-semibold border border-white/20">First year costs</TableHead>
                <TableHead className="w-[100px] px-4 py-2 text-left font-semibold border border-white/20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {group.projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="px-4 py-2 border border-white/20">
                    <Input
                      value={project.name}
                      onChange={(e) => handleCellEdit(group.group_id, project.id, 'name', e.target.value)}
                      className="bg-transparent text-white border-none focus:outline-none focus:ring-0 p-0 h-6 text-sm w-full"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-2 border border-white/20">
                    <Input
                      value={project.actionType}
                      onChange={(e) => handleCellEdit(group.group_id, project.id, 'actionType', e.target.value)}
                      className="bg-transparent text-white border-none focus:outline-none focus:ring-0 p-0 h-6 text-sm w-full"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-2 border border-white/20">
                    <Input
                      value={project.description}
                      onChange={(e) => handleCellEdit(group.group_id, project.id, 'description', e.target.value)}
                      className="bg-transparent text-white border-none focus:outline-none focus:ring-0 p-0 h-6 text-sm w-full"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-2 text-right border border-white/20">
                    <Input
                      type="number"
                      value={project.firstYearCosts}
                      onChange={(e) => handleCellEdit(group.group_id, project.id, 'firstYearCosts', parseFloat(e.target.value))}
                      className="bg-transparent text-white border-none focus:outline-none focus:ring-0 text-right p-0 h-6 text-sm w-full"
                    />
                  </TableCell>
                  <TableCell className="px-4 py-2 border border-white/20">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="px-4 py-2 font-semibold border border-white/20">Total</TableCell>
                <TableCell className="px-4 py-2 text-right font-semibold border border-white/20">
                  ${calculateTotalCost(group.projects).toFixed(2)}
                </TableCell>
                <TableCell className="px-4 py-2 border border-white/20"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button 
            onClick={() => addNewProject(group.group_id)} 
            className="mt-4 bg-blue-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" /> Add New Project
          </Button>
        </div>
      ))}
      <Button 
        onClick={addNewGroup} 
        className="mt-4 bg-green-600 text-white"
      >
        <Plus className="w-4 h-4 mr-2" /> Add New Group
      </Button>
    </div>
  );
}