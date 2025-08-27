'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Search, Filter, Download, Share2, Settings, Eye, Edit, Copy, Maximize2, Minimize2, FileText, Table, Grid3X3, BarChart3, Dna, Globe } from 'lucide-react'

export default function Home() {
  const [activeView, setActiveView] = useState('tree')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['skylab-root']))
  const [fullscreen, setFullscreen] = useState(false)

  // Generate animated stars
  useEffect(() => {
    const starsContainer = document.getElementById('stars-container')
    if (!starsContainer) return

    const generateStars = () => {
      const starCount = 150
      starsContainer.innerHTML = ''

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        
        // Random position
        star.style.left = Math.random() * 100 + '%'
        star.style.top = Math.random() * 100 + '%'
        
        // Random size
        const size = Math.random() * 3 + 1
        star.style.width = size + 'px'
        star.style.height = size + 'px'
        
        // Random animation delay
        star.style.animationDelay = Math.random() * 3 + 's'
        
        // Random opacity
        star.style.opacity = Math.random() * 0.8 + 0.2
        
        starsContainer.appendChild(star)
      }
    }

    generateStars()
    
    // Regenerate stars on window resize
    const handleResize = () => {
      generateStars()
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Comprehensive Skylab Data Structure
  const skylabData = {
    id: 'skylab-root',
    name: 'Skylab Space Station',
    type: 'root',
    status: 'active',
    description: 'NASA\'s first space station and the United States\' first crewed space station',
    color: 'blue',
    metadata: {
      launched: '1973-05-14',
      missionDuration: '1973-1979',
      crewCapacity: '3',
      orbitalAltitude: '435 km',
      mass: '77,088 kg',
      volume: '361 m³'
    },
    children: [
      {
        id: 'structural-systems',
        name: 'Structural Systems',
        type: 'category',
        status: 'active',
        description: 'Primary structural components and framework',
        color: 'cyan',
        children: [
          {
            id: 'orbital-workshop',
            name: 'Orbital Workshop',
            type: 'component',
            status: 'active',
            description: 'Main living and working compartment',
            color: 'cyan',
            specifications: [
              { id: 'ow-001', name: 'Diameter', value: '6.6', unit: 'meters', priority: 'critical', tolerance: '±0.1m' },
              { id: 'ow-002', name: 'Length', value: '14.6', unit: 'meters', priority: 'critical', tolerance: '±0.1m' },
              { id: 'ow-003', name: 'Volume', value: '361', unit: 'm³', priority: 'high', tolerance: '±5m³' },
              { id: 'ow-004', name: 'Mass', value: '35,380', unit: 'kg', priority: 'high', tolerance: '±100kg' },
              { id: 'ow-005', name: 'Pressure', value: '101.3', unit: 'kPa', priority: 'critical', tolerance: '±5kPa' },
              { id: 'ow-006', name: 'Temperature Range', value: '18-24', unit: '°C', priority: 'high', tolerance: '±2°C' }
            ]
          },
          {
            id: 'airlock-module',
            name: 'Airlock Module',
            type: 'component',
            status: 'active',
            description: 'EVA preparation and transition chamber',
            color: 'cyan',
            specifications: [
              { id: 'am-001', name: 'Diameter', value: '3.0', unit: 'meters', priority: 'critical', tolerance: '±0.05m' },
              { id: 'am-002', name: 'Length', value: '5.2', unit: 'meters', priority: 'critical', tolerance: '±0.05m' },
              { id: 'am-003', name: 'Depress Time', value: '15', unit: 'minutes', priority: 'high', tolerance: '±2min' },
              { id: 'am-004', name: 'Repress Time', value: '10', unit: 'minutes', priority: 'high', tolerance: '±1min' }
            ]
          },
          {
            id: 'docking-adapter',
            name: 'Docking Adapter',
            type: 'component',
            status: 'active',
            description: 'Apollo spacecraft docking interface',
            color: 'cyan',
            specifications: [
              { id: 'da-001', name: 'Interface Type', value: 'Androgynous', unit: '', priority: 'critical', tolerance: 'N/A' },
              { id: 'da-002', name: 'Capture Range', value: '±10', unit: 'cm', priority: 'high', tolerance: '±1cm' },
              { id: 'da-003', name: 'Load Capacity', value: '10,000', unit: 'kg', priority: 'critical', tolerance: '±500kg' }
            ]
          }
        ]
      },
      {
        id: 'life-support',
        name: 'Life Support Systems',
        type: 'category',
        status: 'active',
        description: 'Environmental control and life support systems',
        color: 'green',
        children: [
          {
            id: 'atmosphere-control',
            name: 'Atmosphere Control',
            type: 'subsystem',
            status: 'active',
            description: 'Air composition and pressure management',
            color: 'green',
            specifications: [
              { id: 'ac-001', name: 'O₂ Concentration', value: '21', unit: '%', priority: 'critical', tolerance: '±1%' },
              { id: 'ac-002', name: 'CO₂ Concentration', value: '0.3', unit: '%', priority: 'critical', tolerance: '±0.1%' },
              { id: 'ac-003', name: 'Total Pressure', value: '101.3', unit: 'kPa', priority: 'critical', tolerance: '±5kPa' },
              { id: 'ac-004', name: 'Humidity', value: '40-60', unit: '% RH', priority: 'high', tolerance: '±10%' },
              { id: 'ac-005', name: 'Temperature', value: '21±3', unit: '°C', priority: 'high', tolerance: '±1°C' }
            ]
          },
          {
            id: 'thermal-control',
            name: 'Thermal Control',
            type: 'subsystem',
            status: 'active',
            description: 'Temperature regulation and heat rejection',
            color: 'green',
            specifications: [
              { id: 'tc-001', name: 'Heat Rejection', value: '7.5', unit: 'kW', priority: 'high', tolerance: '±0.5kW' },
              { id: 'tc-002', name: 'Radiator Area', value: '111', unit: 'm²', priority: 'high', tolerance: '±5m²' },
              { id: 'tc-003', name: 'Coolant Flow Rate', value: '0.9', unit: 'kg/s', priority: 'high', tolerance: '±0.1kg/s' },
              { id: 'tc-004', name: 'Temperature Range', value: '4-49', unit: '°C', priority: 'medium', tolerance: '±2°C' }
            ]
          },
          {
            id: 'waste-management',
            name: 'Waste Management',
            type: 'subsystem',
            status: 'active',
            description: 'Solid and liquid waste processing',
            color: 'green',
            specifications: [
              { id: 'wm-001', name: 'Urine Processing', value: '90', unit: '%', priority: 'high', tolerance: '±5%' },
              { id: 'wm-002', name: 'Fecal Processing', value: '95', unit: '%', priority: 'high', tolerance: '±3%' },
              { id: 'wm-003', name: 'Water Recovery', value: '85', unit: '%', priority: 'critical', tolerance: '±5%' },
              { id: 'wm-004', name: 'Storage Capacity', value: '30', unit: 'days', priority: 'medium', tolerance: '±2days' }
            ]
          }
        ]
      },
      {
        id: 'power-systems',
        name: 'Power Systems',
        type: 'category',
        status: 'active',
        description: 'Electrical power generation and distribution',
        color: 'yellow',
        children: [
          {
            id: 'solar-arrays',
            name: 'Solar Arrays',
            type: 'component',
            status: 'active',
            description: 'Photovoltaic power generation system',
            color: 'yellow',
            specifications: [
              { id: 'sa-001', name: 'Total Power', value: '12', unit: 'kW', priority: 'critical', tolerance: '±0.5kW' },
              { id: 'sa-002', name: 'Array Area', value: '118', unit: 'm²', priority: 'high', tolerance: '±5m²' },
              { id: 'sa-003', name: 'Cell Efficiency', value: '12.5', unit: '%', priority: 'high', tolerance: '±0.5%' },
              { id: 'sa-004', name: 'Operating Voltage', value: '28', unit: 'V DC', priority: 'critical', tolerance: '±1V' },
              { id: 'sa-005', name: 'Deployment Time', value: '45', unit: 'minutes', priority: 'medium', tolerance: '±5min' }
            ]
          },
          {
            id: 'batteries',
            name: 'Battery System',
            type: 'component',
            status: 'active',
            description: 'Energy storage for orbital night periods',
            color: 'yellow',
            specifications: [
              { id: 'bs-001', name: 'Total Capacity', value: '126', unit: 'Ah', priority: 'critical', tolerance: '±5Ah' },
              { id: 'bs-002', name: 'Voltage', value: '28', unit: 'V DC', priority: 'critical', tolerance: '±1V' },
              { id: 'bs-003', name: 'Depth of Discharge', value: '40', unit: '%', priority: 'high', tolerance: '±5%' },
              { id: 'bs-004', name: 'Cycle Life', value: '5000', unit: 'cycles', priority: 'medium', tolerance: '±500' },
              { id: 'bs-005', name: 'Operating Temp', value: '0-30', unit: '°C', priority: 'high', tolerance: '±5°C' }
            ]
          },
          {
            id: 'power-distribution',
            name: 'Power Distribution',
            type: 'subsystem',
            status: 'active',
            description: 'Electrical power management and distribution',
            color: 'yellow',
            specifications: [
              { id: 'pd-001', name: 'Distribution Voltage', value: '28', unit: 'V DC', priority: 'critical', tolerance: '±1V' },
              { id: 'pd-002', name: 'Max Current', value: '500', unit: 'A', priority: 'high', tolerance: '±10A' },
              { id: 'pd-003', name: 'Efficiency', value: '95', unit: '%', priority: 'high', tolerance: '±2%' },
              { id: 'pd-004', name: 'Redundancy', value: '2N', unit: '', priority: 'critical', tolerance: 'N/A' }
            ]
          }
        ]
      },
      {
        id: 'communications',
        name: 'Communications Systems',
        type: 'category',
        status: 'active',
        description: 'Data transmission and reception systems',
        color: 'purple',
        children: [
          {
            id: 's-band',
            name: 'S-Band System',
            type: 'subsystem',
            status: 'active',
            description: 'Primary communication and telemetry',
            color: 'purple',
            specifications: [
              { id: 'sb-001', name: 'Uplink Frequency', value: '2.1', unit: 'GHz', priority: 'critical', tolerance: '±10MHz' },
              { id: 'sb-002', name: 'Downlink Frequency', value: '2.3', unit: 'GHz', priority: 'critical', tolerance: '±10MHz' },
              { id: 'sb-003', name: 'Data Rate', value: '128', unit: 'kbps', priority: 'high', tolerance: '±10kbps' },
              { id: 'sb-004', name: 'Power Output', value: '20', unit: 'W', priority: 'high', tolerance: '±2W' }
            ]
          },
          {
            id: 'vhf-system',
            name: 'VHF System',
            type: 'subsystem',
            status: 'active',
            description: 'Voice communication and emergency backup',
            color: 'purple',
            specifications: [
              { id: 'vhf-001', name: 'Frequency Range', value: '130-174', unit: 'MHz', priority: 'critical', tolerance: '±5MHz' },
              { id: 'vhf-002', name: 'Channels', value: '2', unit: '', priority: 'high', tolerance: 'N/A' },
              { id: 'vhf-003', name: 'Range', value: '2000', unit: 'km', priority: 'medium', tolerance: '±100km' }
            ]
          }
        ]
      },
      {
        id: 'attitude-control',
        name: 'Attitude Control System',
        type: 'category',
        status: 'active',
        description: 'Spacecraft orientation and stabilization',
        color: 'orange',
        children: [
          {
            id: 'control-moment-gyro',
            name: 'Control Moment Gyros',
            type: 'component',
            status: 'active',
            description: 'Primary attitude control actuators',
            color: 'orange',
            specifications: [
              { id: 'cmg-001', name: 'Number of CMGs', value: '3', unit: '', priority: 'critical', tolerance: 'N/A' },
              { id: 'cmg-002', name: 'Momentum Capacity', value: '2000', unit: 'Nms', priority: 'critical', tolerance: '±100Nms' },
              { id: 'cmg-003', name: 'Torque Output', value: '50', unit: 'Nm', priority: 'high', tolerance: '±5Nm' },
              { id: 'cmg-004', name: 'Pointing Accuracy', value: '0.1', unit: 'degrees', priority: 'high', tolerance: '±0.05°' }
            ]
          },
          {
            id: 'thrusters',
            name: 'Reaction Control System',
            type: 'component',
            status: 'active',
            description: 'Chemical thrusters for attitude control',
            color: 'orange',
            specifications: [
              { id: 'rcs-001', name: 'Thruster Count', value: '12', unit: '', priority: 'critical', tolerance: 'N/A' },
              { id: 'rcs-002', name: 'Thrust per Thruster', value: '25', unit: 'N', priority: 'high', tolerance: '±2N' },
              { id: 'rcs-003', name: 'Propellant', value: 'N2H4/UDMH', unit: '', priority: 'critical', tolerance: 'N/A' },
              { id: 'rcs-004', name: 'Total Impulse', value: '50,000', unit: 'Ns', priority: 'high', tolerance: '±1000Ns' }
            ]
          }
        ]
      }
    ]
  }

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId)
    } else {
      newExpanded.add(nodeId)
    }
    setExpandedNodes(newExpanded)
  }

  const getNodeGlowClass = (color: string) => {
    const colors = {
      blue: 'glow-border-blue',
      cyan: 'glow-border-sky',
      green: 'glow-border-cyan',
      yellow: 'glow-border-blue',
      purple: 'glow-border-blue',
      orange: 'glow-border-blue',
      red: 'glow-border-blue'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      critical: 'border-red-400 text-red-400 bg-red-900/20',
      high: 'border-orange-400 text-orange-400 bg-orange-900/20',
      medium: 'border-yellow-400 text-yellow-400 bg-yellow-900/20',
      low: 'border-green-400 text-green-400 bg-green-900/20'
    }
    return colors[priority as keyof typeof colors] || colors.medium
  }

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-600 hover:bg-green-700',
      inactive: 'bg-gray-600 hover:bg-gray-700',
      maintenance: 'bg-yellow-600 hover:bg-yellow-700',
      degraded: 'bg-orange-600 hover:bg-orange-700'
    }
    return colors[status as keyof typeof colors] || colors.active
  }

  // Enhanced search and filter function
  const filterAndSearchData = (data: any, term: string, status: string): any => {
    if (!data) return null
    
    const searchLower = term.toLowerCase().trim()
    
    // Check if current node matches search criteria
    const matchesSearch = !searchLower || 
      data.name.toLowerCase().includes(searchLower) ||
      (data.description && data.description.toLowerCase().includes(searchLower)) ||
      (data.specifications && data.specifications.some((spec: any) => 
        spec.name.toLowerCase().includes(searchLower) ||
        spec.value.toLowerCase().includes(searchLower) ||
        spec.unit.toLowerCase().includes(searchLower) ||
        (spec.tolerance && spec.tolerance.toLowerCase().includes(searchLower))
      ))
    
    // Check if current node matches status filter
    const matchesStatus = status === 'all' || data.status === status
    
    // If node doesn't match search but has children that might match, continue processing
    if (!matchesSearch && !matchesStatus && data.children) {
      const filteredChildren = data.children
        .map((child: any) => filterAndSearchData(child, term, status))
        .filter((child: any) => child !== null)
      
      if (filteredChildren.length > 0) {
        return { ...data, children: filteredChildren }
      }
      return null
    }
    
    // If node matches status but not search, only include if it has matching children
    if (matchesStatus && !matchesSearch && data.children) {
      const filteredChildren = data.children
        .map((child: any) => filterAndSearchData(child, term, status))
        .filter((child: any) => child !== null)
      
      if (filteredChildren.length > 0) {
        return { ...data, children: filteredChildren }
      }
      return null
    }
    
    // If node matches both criteria, process its children
    if (matchesSearch && matchesStatus) {
      if (data.children) {
        const filteredChildren = data.children
          .map((child: any) => filterAndSearchData(child, term, status))
          .filter((child: any) => child !== null)
        
        // Always include the node if it matches, even if no children
        return { ...data, children: filteredChildren }
      }
      
      // Include leaf nodes that match
      return data
    }
    
    return null
  }

  // Export functionality
  const exportSpecsBook = () => {
    const allSpecs: any[] = []
    
    const collectSpecs = (node: any, path: string = '') => {
      const currentPath = path ? `${path} > ${node.name}` : node.name
      
      if (node.specifications) {
        node.specifications.forEach((spec: any) => {
          allSpecs.push({
            ...spec,
            systemPath: currentPath,
            category: node.name,
            type: node.type,
            status: node.status
          })
        })
      }
      
      if (node.children) {
        node.children.forEach((child: any) => collectSpecs(child, currentPath))
      }
    }
    
    collectSpecs(skylabData)
    
    // Create CSV content
    const headers = ['ID', 'System Path', 'Category', 'Type', 'Status', 'Specification', 'Value', 'Unit', 'Priority', 'Tolerance']
    const csvContent = [
      headers.join(','),
      ...allSpecs.map(spec => [
        spec.id,
        `"${spec.systemPath}"`,
        `"${spec.category}"`,
        spec.type,
        spec.status,
        `"${spec.name}"`,
        spec.value,
        spec.unit,
        spec.priority,
        `"${spec.tolerance}"`
      ].join(','))
    ].join('\n')
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `skylab-specifications-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Also create a formatted text version
    const textContent = allSpecs.map(spec => 
      `${spec.name}\n` +
      `  Value: ${spec.value} ${spec.unit}\n` +
      `  Priority: ${spec.priority}\n` +
      `  Tolerance: ${spec.tolerance}\n` +
      `  System: ${spec.systemPath}\n` +
      `  Status: ${spec.status}\n` +
      '---\n'
    ).join('\n')
    
    const textBlob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' })
    const textLink = document.createElement('a')
    const textUrl = URL.createObjectURL(textBlob)
    textLink.setAttribute('href', textUrl)
    textLink.setAttribute('download', `skylab-specs-book-${new Date().toISOString().split('T')[0]}.txt`)
    textLink.style.visibility = 'hidden'
    document.body.appendChild(textLink)
    textLink.click()
    document.body.removeChild(textLink)
  }

  const renderSpecTree = (node: any, level: number = 0) => {
    if (!node) return null
    
    const isExpanded = expandedNodes.has(node.id)
    const isSelected = selectedNode === node.id
    const hasChildren = node.children && node.children.length > 0
    
    return (
      <div key={node.id} className="space-y-2">
        <div 
          className={`p-4 rounded-lg transition-all duration-300 cursor-pointer card-glow-hover ${getNodeGlowClass(node.color)} ${
            isSelected ? 'ring-2 ring-white/50 shadow-lg' : ''
          } ${
            hasChildren ? 'hover:shadow-lg hover:scale-105' : ''
          }`}
          onClick={() => {
            setSelectedNode(node.id)
            if (hasChildren) {
              toggleNode(node.id)
            }
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-lg font-orbitron">{node.name}</h3>
              <p className="text-sm opacity-80 font-roboto">{node.description}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className={`text-xs ${getStatusColor(node.status)}`}>
                  {node.status}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {node.type}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {hasChildren && (
                <Button variant="ghost" size="sm">
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Eye size={16} />
              </Button>
              <Button variant="ghost" size="sm">
                <Edit size={16} />
              </Button>
            </div>
          </div>
          
          {node.metadata && (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(node.metadata).map(([key, value]) => (
                <div key={key} className="text-xs bg-black/20 rounded p-1 font-roboto">
                  <span className="opacity-70">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span> {value}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="ml-6 space-y-2 border-l-2 border-gray-600 pl-4">
            {node.children.map((child: any) => renderSpecTree(child, level + 1))}
          </div>
        )}
        
        {node.specifications && (
          <div className="ml-6 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {node.specifications.map((spec: any) => (
                <div 
                  key={spec.id}
                  className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer card-glow-hover ${getPriorityColor(spec.priority)} ${
                    selectedNode === spec.id ? 'ring-1 ring-white/30' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedNode(spec.id)
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm font-roboto">{spec.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {spec.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-mono font-roboto">{spec.value}</span>
                    <span className="text-xs opacity-70 font-roboto">{spec.unit}</span>
                  </div>
                  <div className="text-xs opacity-60 mt-1 font-roboto">
                    Tolerance: {spec.tolerance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderTableView = (data: any) => {
    if (!data) return null
    
    const allSpecs: any[] = []
    
    const collectSpecs = (node: any, path: string = '') => {
      const currentPath = path ? `${path} > ${node.name}` : node.name
      
      if (node.specifications) {
        allSpecs.push(...node.specifications.map((spec: any) => ({
          ...spec,
          systemPath: currentPath,
          category: node.name,
          system: node.type
        })))
      }
      if (node.children) {
        node.children.forEach((child: any) => collectSpecs(child, currentPath))
      }
    }
    
    collectSpecs(data)
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left p-3 font-orbitron">Specification</th>
              <th className="text-left p-3 font-orbitron">System Path</th>
              <th className="text-left p-3 font-orbitron">Value</th>
              <th className="text-left p-3 font-orbitron">Unit</th>
              <th className="text-left p-3 font-orbitron">Priority</th>
              <th className="text-left p-3 font-orbitron">Tolerance</th>
            </tr>
          </thead>
          <tbody>
            {allSpecs.map((spec, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-800/50">
                <td className="p-3 font-medium font-roboto">{spec.name}</td>
                <td className="p-3">
                  <div className="text-xs text-gray-400 font-roboto">{spec.systemPath}</div>
                </td>
                <td className="p-3 font-mono font-roboto">{spec.value}</td>
                <td className="p-3 font-roboto">{spec.unit}</td>
                <td className="p-3">
                  <Badge variant="outline" className={`text-xs ${getPriorityColor(spec.priority)}`}>
                    {spec.priority}
                  </Badge>
                </td>
                <td className="p-3 font-roboto">{spec.tolerance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const filteredData = filterAndSearchData(skylabData, searchTerm, filterStatus)

  return (
    <div className={`min-h-screen text-white font-roboto relative overflow-hidden ${fullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Cosmic Background Elements */}
      <div className="cosmic-bg"></div>
      <div className="cosmic-stars" id="cosmic-stars"></div>
      <div className="cosmic-nebula"></div>
      <div className="cosmic-grid"></div>
      
      {/* Cosmic Particles */}
      <div id="cosmic-particles"></div>
      
      {/* Shooting Stars */}
      <div id="shooting-stars"></div>
      
      {/* Header */}
      <header className="relative bg-black/20 backdrop-blur-sm border-b border-gray-700/50 p-4 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-sky-400 rounded-lg flex items-center justify-center glow-border-supernova">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent font-orbitron animate-gradient">
                Skylab Architecture Explorer
              </h1>
              <p className="text-sm text-gray-300 font-roboto">Interactive specification tree visualization</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exportSpecsBook}
              className="hover:bg-blue-600 hover:text-white transition-all duration-300 glow-border-supernova cosmic-glow"
            >
              <Download size={16} className="mr-2" />
              Export Cosmic Data
            </Button>
            <Button variant="outline" size="sm" onClick={() => setFullscreen(!fullscreen)} className="glow-border-supernova cosmic-glow">
              {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </Button>
            <Button variant="outline" size="sm" className="glow-border-supernova cosmic-glow">
              <Share2 size={16} />
            </Button>
            <Button variant="outline" size="sm" className="glow-border-supernova cosmic-glow">
              <Settings size={16} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.location.href = '/planetary-life'}
              className="glow-border-supernova cosmic-glow"
            >
              <Dna size={16} />
            </Button>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="bg-black/30 backdrop-blur-md border-b border-blue-500/30 p-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2 flex-1 min-w-64">
              <Search size={20} className="text-cyan-400" />
              <Input
                placeholder="Search cosmic specifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800/60 border-blue-500/50 text-white placeholder-sky-400 font-roboto focus:border-sky-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-purple-400" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40 bg-gray-800/60 border-blue-500/50 text-white font-roboto focus:border-sky-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800/90 border-blue-500/50 backdrop-blur-md">
                  <SelectItem value="all" className="font-roboto text-cyan-300">All Status</SelectItem>
                  <SelectItem value="active" className="font-roboto text-green-300">Active</SelectItem>
                  <SelectItem value="inactive" className="font-roboto text-gray-300">Inactive</SelectItem>
                  <SelectItem value="maintenance" className="font-roboto text-yellow-300">Maintenance</SelectItem>
                  <SelectItem value="degraded" className="font-roboto text-orange-300">Degraded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* View Tabs */}
          <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/60 backdrop-blur-md glow-border-supernova">
              <TabsTrigger value="tree" className="cosmic-tab data-[state=active]:bg-blue-600 font-orbitron">
                <Grid3X3 size={16} className="mr-2" />
                Cosmic Tree
              </TabsTrigger>
              <TabsTrigger value="table" className="cosmic-tab data-[state=active]:bg-sky-600 font-orbitron">
                <Table size={16} className="mr-2" />
                Stellar Table
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="cosmic-tab data-[state=active]:bg-cyan-600 font-orbitron">
                <BarChart3 size={16} className="mr-2" />
                Nova Dashboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tree" className="mt-6">
              <div className="space-y-4">
                {filteredData ? renderSpecTree(filteredData) : (
                  <div className="text-center py-12 text-gray-400">
                    <Search size={48} className="mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2 font-orbitron">No matching specifications found</h3>
                    <p className="text-sm font-roboto">Try adjusting your search terms or filters</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="table" className="mt-6">
              <Card className="bg-gray-800/60 backdrop-blur-md border-blue-500/30 glow-border-supernova">
                <CardHeader>
                  <CardTitle className="text-cyan-400 font-orbitron">Stellar Specifications</CardTitle>
                  <CardDescription className="text-purple-300 font-roboto">
                    Complete cosmic database of all Skylab specifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredData ? renderTableView(filteredData) : (
                    <div className="text-center py-12 text-gray-400">
                      <Search size={48} className="mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-medium mb-2 font-orbitron">No matching specifications found</h3>
                      <p className="text-sm font-roboto">Try adjusting your search terms or filters</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dashboard" className="mt-6">
              <div className="staggered-grid">
                <Card className="bg-gray-800/60 backdrop-blur-md border-blue-500/30 glow-border-supernova card-cosmic-hover staggered-card floating-card cosmic-card-enhanced">
                  <CardHeader>
                    <CardTitle className="text-cyan-400 font-orbitron">Cosmic Systems</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold font-orbitron text-cyan-300">5</div>
                    <p className="text-sm text-cyan-200 font-roboto">Major constellations</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800/60 backdrop-blur-md border-sky-500/30 glow-border-supernova card-cosmic-hover staggered-card floating-card cosmic-card-enhanced">
                  <CardHeader>
                    <CardTitle className="text-purple-400 font-orbitron">Stellar Specs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold font-orbitron text-purple-300">42</div>
                    <p className="text-sm text-purple-200 font-roboto">Total parameters</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800/60 backdrop-blur-md border-cyan-500/30 glow-border-supernova card-cosmic-hover staggered-card floating-card cosmic-card-enhanced">
                  <CardHeader>
                    <CardTitle className="text-pink-400 font-orbitron">Nova Priority</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold font-orbitron text-pink-300">18</div>
                    <p className="text-sm text-pink-200 font-roboto">Critical systems</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800/60 backdrop-blur-md border-blue-500/30 glow-border-supernova card-cosmic-hover staggered-card floating-card cosmic-card-enhanced">
                  <CardHeader>
                    <CardTitle className="text-green-400 font-orbitron">Galaxy Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold font-orbitron text-green-300">100%</div>
                    <p className="text-sm text-green-200 font-roboto">All systems operational</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800/60 backdrop-blur-md border-purple-500/30 glow-border-supernova card-cosmic-hover staggered-card floating-card cosmic-card-enhanced">
                  <CardHeader>
                    <CardTitle className="text-purple-400 font-orbitron flex items-center">
                      <Dna className="mr-2" />
                      Planetary Life Evolution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold font-orbitron text-purple-300">6</div>
                    <p className="text-sm text-purple-200 font-roboto">Planets with life potential</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => window.location.href = '/planetary-life'}
                      className="mt-2 border-purple-500 text-purple-300 hover:bg-purple-500/20"
                    >
                      <Globe className="mr-2 h-4 w-4" />
                      Explore Evolution
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-gray-800/60 backdrop-blur-md border-blue-500/30 glow-border-supernova mt-6 card-cosmic-hover staggered-card cosmic-card-enhanced">
                <CardHeader>
                  <CardTitle className="text-cyan-400 font-orbitron">Cosmic Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skylabData.children?.map((system: any) => (
                      <div key={system.id} className="flex items-center justify-between p-3 bg-gray-900/60 backdrop-blur-sm rounded-lg glow-border-supernova card-cosmic-hover">
                        <div className="flex-1">
                          <h4 className="font-medium font-orbitron text-cyan-300">{system.name}</h4>
                          <p className="text-sm text-purple-200 font-roboto">{system.description}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(system.status)}>
                          {system.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-black/20 backdrop-blur-sm border-b border-gray-700/50 p-4 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-300 font-roboto">
            Skylab Architecture Explorer • Interactive Space Station Specification Database
          </p>
          <div className="flex justify-center space-x-4 mt-2 text-xs text-gray-400 font-roboto">
            <span>Data Source: NASA Historical Archives</span>
            <span>•</span>
            <span>Cosmic Edition</span>
          </div>
        </div>
      </footer>
      
      {/* Cosmic Effects Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Generate cosmic stars
          function createStars() {
            const starsContainer = document.getElementById('cosmic-stars');
            if (!starsContainer) return;
            
            for (let i = 0; i < 200; i++) {
              const star = document.createElement('div');
              star.className = 'star';
              star.style.left = Math.random() * 100 + '%';
              star.style.top = Math.random() * 100 + '%';
              star.style.width = Math.random() * 3 + 1 + 'px';
              star.style.height = star.style.width;
              star.style.animationDelay = Math.random() * 3 + 's';
              star.style.animationDuration = (Math.random() * 3 + 2) + 's';
              starsContainer.appendChild(star);
            }
          }
          
          // Generate cosmic particles
          function createParticles() {
            const particlesContainer = document.getElementById('cosmic-particles');
            if (!particlesContainer) return;
            
            for (let i = 0; i < 50; i++) {
              const particle = document.createElement('div');
              particle.className = 'cosmic-particle';
              particle.style.left = Math.random() * 100 + '%';
              particle.style.animationDelay = Math.random() * 10 + 's';
              particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
              particlesContainer.appendChild(particle);
            }
          }
          
          // Generate shooting stars
          function createShootingStars() {
            const shootingStarsContainer = document.getElementById('shooting-stars');
            if (!shootingStarsContainer) return;
            
            for (let i = 0; i < 3; i++) {
              const shootingStar = document.createElement('div');
              shootingStar.className = 'shooting-star';
              shootingStar.style.top = Math.random() * 50 + '%';
              shootingStar.style.animationDelay = Math.random() * 5 + 's';
              shootingStar.style.animationDuration = (Math.random() * 2 + 3) + 's';
              shootingStarsContainer.appendChild(shootingStar);
            }
          }
          
          // Initialize cosmic effects
          document.addEventListener('DOMContentLoaded', function() {
            createStars();
            createParticles();
            createShootingStars();
          });
        `
      }} />
    </div>
  )
}