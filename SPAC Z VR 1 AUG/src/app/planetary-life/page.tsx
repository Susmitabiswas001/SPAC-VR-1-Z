'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Globe, 
  Rocket, 
  Microscope, 
  Clock, 
  Zap, 
  Droplets, 
  Wind, 
  Mountain,
  Sparkles,
  Telescope,
  Dna
} from 'lucide-react'

// Planetary Life Evolution Data Structure
interface PlanetaryData {
  id: string
  name: string
  type: 'terrestrial' | 'gas-giant' | 'ice-giant' | 'dwarf'
  distanceFromSun: number // in AU
  mass: number // in Earth masses
  radius: number // in Earth radii
  atmosphere: {
    composition: string[]
    pressure: number // in atm
    temperature: number // in Celsius
  }
  water: {
    percentage: number
    state: 'liquid' | 'ice' | 'vapor' | 'none'
    distribution: string
  }
  lifePotential: {
    score: number // 0-100
    factors: string[]
    timeline: LifeEvent[]
  }
  evolution: {
    currentStage: string
    possibleFuture: string[]
    keyEvents: string[]
  }
}

interface LifeEvent {
  age: number // in billion years
  event: string
  description: string
  significance: 'low' | 'medium' | 'high' | 'critical'
  category: 'geological' | 'atmospheric' | 'biological' | 'climatic'
}

// Real Planetary Data
const planetaryData: PlanetaryData[] = [
  {
    id: 'earth',
    name: 'Earth',
    type: 'terrestrial',
    distanceFromSun: 1.0,
    mass: 1.0,
    radius: 1.0,
    atmosphere: {
      composition: ['Nitrogen 78%', 'Oxygen 21%', 'Argon 0.9%', 'CO2 0.04%'],
      pressure: 1.0,
      temperature: 15
    },
    water: {
      percentage: 71,
      state: 'liquid',
      distribution: 'Oceans, lakes, rivers, ice caps'
    },
    lifePotential: {
      score: 95,
      factors: ['Liquid water', 'Suitable temperature', 'Protective atmosphere', 'Organic compounds', 'Energy sources'],
      timeline: [
        {
          age: 4.6,
          event: 'Planet Formation',
          description: 'Earth forms from solar nebula debris',
          significance: 'critical',
          category: 'geological'
        },
        {
          age: 4.4,
          event: 'Moon Formation',
          description: 'Giant impact creates Moon',
          significance: 'critical',
          category: 'geological'
        },
        {
          age: 4.0,
          event: 'Late Heavy Bombardment',
          description: 'Intense asteroid and comet impacts',
          significance: 'high',
          category: 'geological'
        },
        {
          age: 3.8,
          event: 'First Oceans',
          description: 'Liquid water oceans form on surface',
          significance: 'critical',
          category: 'climatic'
        },
        {
          age: 3.5,
          event: 'First Life',
          description: 'Emergence of prokaryotic cells',
          significance: 'critical',
          category: 'biological'
        },
        {
          age: 2.7,
          event: 'Oxygen Revolution',
          description: 'Cyanobacteria produce oxygen via photosynthesis',
          significance: 'critical',
          category: 'biological'
        },
        {
          age: 2.1,
          event: 'Complex Cells',
          description: 'First eukaryotic cells appear',
          significance: 'high',
          category: 'biological'
        },
        {
          age: 1.5,
          event: 'Multicellular Life',
          description: 'First multicellular organisms',
          significance: 'high',
          category: 'biological'
        },
        {
          age: 0.8,
          event: 'Ediacaran Fauna',
          description: 'First complex multicellular life',
          significance: 'high',
          category: 'biological'
        },
        {
          age: 0.541,
          event: 'Cambrian Explosion',
          description: 'Rapid diversification of animal life',
          significance: 'critical',
          category: 'biological'
        },
        {
          age: 0.4,
          event: 'Land Colonization',
          description: 'Plants and animals move to land',
          significance: 'high',
          category: 'biological'
        },
        {
          age: 0.2,
          event: 'Dinosaurs',
          description: 'Age of reptiles and dinosaurs',
          significance: 'high',
          category: 'biological'
        },
        {
          age: 0.066,
          event: 'K-Pg Extinction',
          description: 'Asteroid impact, dinosaur extinction',
          significance: 'high',
          category: 'climatic'
        },
        {
          age: 0.002,
          event: 'Human Evolution',
          description: 'Emergence of Homo sapiens',
          significance: 'critical',
          category: 'biological'
        },
        {
          age: 0.0003,
          event: 'Industrial Revolution',
          description: 'Human technological advancement',
          significance: 'high',
          category: 'climatic'
        }
      ]
    },
    evolution: {
      currentStage: 'Technological Civilization',
      possibleFuture: ['Space-faring civilization', 'Planetary ecosystem management', 'Interstellar colonization'],
      keyEvents: ['Photosynthesis', 'Multicellularity', 'Intelligence', 'Technology']
    }
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'terrestrial',
    distanceFromSun: 1.52,
    mass: 0.107,
    radius: 0.532,
    atmosphere: {
      composition: ['CO2 95%', 'Nitrogen 2.7%', 'Argon 1.6%', 'Oxygen 0.13%'],
      pressure: 0.006,
      temperature: -63
    },
    water: {
      percentage: 5,
      state: 'ice',
      distribution: 'Polar ice caps, subsurface ice'
    },
    lifePotential: {
      score: 35,
      factors: ['Subsurface water ice', 'Past liquid water', 'Organic compounds detected', 'Energy sources'],
      timeline: [
        {
          age: 4.6,
          event: 'Planet Formation',
          description: 'Mars forms from solar nebula',
          significance: 'critical',
          category: 'geological'
        },
        {
          age: 4.1,
          event: 'Magnetic Field Loss',
          description: 'Core dynamo stops, magnetic field weakens',
          significance: 'critical',
          category: 'geological'
        },
        {
          age: 3.8,
          event: 'Wet Mars Period',
          description: 'Liquid water flows on surface',
          significance: 'high',
          category: 'climatic'
        },
        {
          age: 3.5,
          event: 'Valley Formation',
          description: 'River valleys and lake basins form',
          significance: 'high',
          category: 'geological'
        },
        {
          age: 3.0,
          event: 'Atmospheric Loss',
          description: 'Solar wind strips most atmosphere',
          significance: 'critical',
          category: 'atmospheric'
        },
        {
          age: 2.5,
          event: 'Climate Change',
          description: 'Planet becomes cold and dry',
          significance: 'high',
          category: 'climatic'
        },
        {
          age: 0.0,
          event: 'Current State',
          description: 'Cold, dry desert with subsurface ice',
          significance: 'medium',
          category: 'climatic'
        }
      ]
    },
    evolution: {
      currentStage: 'Post-Biological Desert',
      possibleFuture: ['Terraforming potential', 'Subsurface life discovery', 'Human colonization'],
      keyEvents: ['Early wet period', 'Atmospheric loss', 'Current frozen state']
    }
  },
  {
    id: 'europa',
    name: 'Europa',
    type: 'ice-giant',
    distanceFromSun: 5.2,
    mass: 0.008,
    radius: 0.245,
    atmosphere: {
      composition: ['Oxygen 80%', 'Sodium 19%', 'Other 1%'],
      pressure: 0.000001,
      temperature: -160
    },
    water: {
      percentage: 90,
      state: 'liquid',
      distribution: 'Global subsurface ocean, ice crust'
    },
    lifePotential: {
      score: 75,
      factors: ['Liquid water ocean', 'Tidal heating', 'Organic compounds', 'Energy from chemistry'],
      timeline: [
        {
          age: 4.5,
          event: 'Formation',
          description: 'Forms with Jupiter system',
          significance: 'critical',
          category: 'geological'
        },
        {
          age: 4.0,
          event: 'Ocean Formation',
          description: 'Subsurface liquid ocean develops',
          significance: 'critical',
          category: 'climatic'
        },
        {
          age: 3.5,
          event: 'Ice Crust Development',
          description: 'Thick ice crust forms over ocean',
          significance: 'high',
          category: 'geological'
        },
        {
          age: 2.0,
          event: 'Tidal Heating',
          description: 'Jupiter\'s gravity creates internal heat',
          significance: 'critical',
          category: 'geological'
        },
        {
          age: 0.0,
          event: 'Current State',
          description: 'Active ocean with potential hydrothermal vents',
          significance: 'high',
          category: 'climatic'
        }
      ]
    },
    evolution: {
      currentStage: 'Subsurface Ocean World',
      possibleFuture: ['Microbial life discovery', 'Complex ecosystems', 'Human exploration'],
      keyEvents: ['Ocean formation', 'Tidal heating', 'Ice crust stability']
    }
  },
  {
    id: 'titan',
    name: 'Titan',
    type: 'ice-giant',
    distanceFromSun: 9.5,
    mass: 0.0225,
    radius: 0.404,
    atmosphere: {
      composition: ['Nitrogen 95%', 'Methane 5%', 'Hydrogen 0.1%'],
      pressure: 1.5,
      temperature: -179
    },
    water: {
      percentage: 50,
      state: 'ice',
      distribution: 'Water ice bedrock, methane lakes'
    },
    lifePotential: {
      score: 45,
      factors: ['Liquid methane/ethane', 'Complex organic chemistry', 'Atmospheric nitrogen', 'Energy sources'],
      timeline: [
        {
          age: 4.5,
          event: 'Formation',
          description: 'Forms with Saturn system',
          significance: 'critical',
          category: 'geological'
        },
        {
          age: 4.0,
          event: 'Atmosphere Formation',
          description: 'Thick nitrogen atmosphere develops',
          significance: 'high',
          category: 'atmospheric'
        },
        {
          age: 3.5,
          event: 'Methane Cycle',
          description: 'Liquid methane cycle begins',
          significance: 'high',
          category: 'climatic'
        },
        {
          age: 2.0,
          event: 'Organic Chemistry',
          description: 'Complex organic compounds form',
          significance: 'high',
          category: 'biological'
        },
        {
          age: 0.0,
          event: 'Current State',
          description: 'Cold world with methane lakes and organic dunes',
          significance: 'medium',
          category: 'climatic'
        }
      ]
    },
    evolution: {
      currentStage: 'Prebiotic Chemistry Lab',
      possibleFuture: ['Alternative biochemistry discovery', 'Methane-based life', 'Human research station'],
      keyEvents: ['Atmosphere formation', 'Methane cycle', 'Organic chemistry']
    }
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'terrestrial',
    distanceFromSun: 0.72,
    mass: 0.815,
    radius: 0.949,
    atmosphere: {
      composition: ['CO2 96.5%', 'Nitrogen 3.5%', 'SO2 0.015%'],
      pressure: 92,
      temperature: 462
    },
    water: {
      percentage: 0.002,
      state: 'vapor',
      distribution: 'Trace atmospheric water vapor'
    },
    lifePotential: {
      score: 5,
      factors: ['Past liquid water possible', 'Similar size to Earth', 'Geological activity'],
      timeline: [
        {
          age: 4.6,
          event: 'Formation',
          description: 'Venus forms from solar nebula',
          significance: 'critical',
          category: 'geological'
        },
        {
          age: 4.2,
          event: 'Early Ocean',
          description: 'Possible early liquid water ocean',
          significance: 'high',
          category: 'climatic'
        },
        {
          age: 3.5,
          event: 'Runaway Greenhouse',
          description: 'CO2 buildup causes extreme heating',
          significance: 'critical',
          category: 'climatic'
        },
        {
          age: 3.0,
          event: 'Water Loss',
          description: 'All surface water evaporates',
          significance: 'critical',
          category: 'climatic'
        },
        {
          age: 2.0,
          event: 'Current Atmosphere',
          description: 'Thick CO2 atmosphere establishes',
          significance: 'high',
          category: 'atmospheric'
        },
        {
          age: 0.0,
          event: 'Current State',
          description: 'Hot, dry world with thick atmosphere',
          significance: 'medium',
          category: 'climatic'
        }
      ]
    },
    evolution: {
      currentStage: 'Runaway Greenhouse',
      possibleFuture: ['Atmospheric study', 'Climate change lessons', 'Future terraforming'],
      keyEvents: ['Early ocean', 'Runaway greenhouse', 'Current hostile state']
    }
  },
  {
    id: 'exoplanet-kepler452b',
    name: 'Kepler-452b',
    type: 'terrestrial',
    distanceFromSun: 1400,
    mass: 5.0,
    radius: 1.6,
    atmosphere: {
      composition: ['Unknown (estimated: Nitrogen, Oxygen, CO2)'],
      pressure: 1.2,
      temperature: 8
    },
    water: {
      percentage: 60,
      state: 'liquid',
      distribution: 'Estimated oceans and continents'
    },
    lifePotential: {
      score: 85,
      factors: ['Habitable zone', 'Earth-like conditions', 'Older than Earth', 'Stable star'],
      timeline: [
        {
          age: 6.0,
          event: 'Formation',
          description: 'Forms around G-type star',
          significance: 'critical',
          category: 'geological'
        },
        {
          age: 5.5,
          event: 'Early Evolution',
          description: 'Planetary differentiation',
          significance: 'high',
          category: 'geological'
        },
        {
          age: 4.5,
          event: 'Ocean Formation',
          description: 'Liquid water oceans develop',
          significance: 'critical',
          category: 'climatic'
        },
        {
          age: 4.0,
          event: 'Atmosphere Development',
          description: 'Stable atmosphere forms',
          significance: 'high',
          category: 'atmospheric'
        },
        {
          age: 3.0,
          event: 'Possible Life Emergence',
          description: 'Conditions suitable for life',
          significance: 'high',
          category: 'biological'
        },
        {
          age: 0.0,
          event: 'Current State',
          description: 'Potentially habitable super-Earth',
          significance: 'high',
          category: 'climatic'
        }
      ]
    },
    evolution: {
      currentStage: 'Potentially Habitable',
      possibleFuture: ['Advanced life forms', 'Complex ecosystems', 'Technological civilization'],
      keyEvents: ['Early habitability', 'Stable climate', 'Possible life evolution']
    }
  }
]

export default function PlanetaryLifeEvolution() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetaryData>(planetaryData[0])
  const [simulationTime, setSimulationTime] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [simulationSpeed, setSimulationSpeed] = useState<number>(100)
  const [selectedEvent, setSelectedEvent] = useState<LifeEvent | null>(null)
  const [viewMode, setViewMode] = useState<'timeline' | 'comparison' | 'simulation'>('timeline')
  
  const simulationRef = useRef<NodeJS.Timeout | null>(null)

  // Simulation logic
  useEffect(() => {
    if (isPlaying) {
      simulationRef.current = setInterval(() => {
        setSimulationTime(prev => {
          const newTime = prev + 0.1
          if (newTime > 4.6) return 0
          return newTime
        })
      }, simulationSpeed)
    } else {
      if (simulationRef.current) {
        clearInterval(simulationRef.current)
      }
    }

    return () => {
      if (simulationRef.current) {
        clearInterval(simulationRef.current)
      }
    }
  }, [isPlaying, simulationSpeed])

  const handlePlanetChange = (planetId: string) => {
    const planet = planetaryData.find(p => p.id === planetId)
    if (planet) {
      setSelectedPlanet(planet)
      setSimulationTime(0)
      setSelectedEvent(null)
    }
  }

  const handleEventClick = (event: LifeEvent) => {
    setSelectedEvent(event)
    setSimulationTime(event.age)
  }

  const resetSimulation = () => {
    setSimulationTime(0)
    setIsPlaying(false)
    setSelectedEvent(null)
  }

  const getLifePotentialColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-blue-400'
    if (score >= 40) return 'text-yellow-400'
    if (score >= 20) return 'text-orange-400'
    return 'text-red-400'
  }

  const getLifePotentialLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Moderate'
    if (score >= 20) return 'Poor'
    return 'None'
  }

  const getEventColor = (category: string) => {
    switch (category) {
      case 'geological': return 'bg-amber-500'
      case 'atmospheric': return 'bg-blue-500'
      case 'biological': return 'bg-green-500'
      case 'climatic': return 'bg-cyan-500'
      default: return 'bg-gray-500'
    }
  }

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'critical': return 'border-red-500 bg-red-900/20'
      case 'high': return 'border-orange-500 bg-orange-900/20'
      case 'medium': return 'border-yellow-500 bg-yellow-900/20'
      case 'low': return 'border-green-500 bg-green-900/20'
      default: return 'border-gray-500 bg-gray-900/20'
    }
  }

  const renderTimeline = () => (
    <div className="space-y-6">
      <Card className="bg-gray-800/60 backdrop-blur-md border-blue-500/30 glow-border-supernova">
        <CardHeader>
          <CardTitle className="text-blue-400 font-orbitron flex items-center">
            <Clock className="mr-2" />
            {selectedPlanet.name} Evolution Timeline
          </CardTitle>
          <CardDescription className="text-blue-200">
            {selectedPlanet.lifePotential.timeline.length} major events in planetary history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline visualization */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-blue-300"></div>
            
            <div className="space-y-6">
              {selectedPlanet.lifePotential.timeline.map((event, index) => (
                <div 
                  key={index} 
                  className={`relative pl-12 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedEvent?.event === event.event ? 'scale-105' : ''
                  }`}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="absolute left-2 w-4 h-4 rounded-full bg-blue-500 border-2 border-blue-300"></div>
                  
                  <Card className={`bg-gray-700/80 backdrop-blur-sm border-l-4 ${getSignificanceColor(event.significance)} hover:shadow-lg transition-all duration-300`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getEventColor(event.category)} text-white`}>
                            {event.category}
                          </Badge>
                          <span className="text-sm text-blue-300 font-orbitron">
                            {event.age.toFixed(1)} Ga
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {event.significance}
                        </Badge>
                      </div>
                      <CardTitle className="text-white text-lg">{event.event}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-sm">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderComparison = () => (
    <div className="space-y-6">
      <Card className="bg-gray-800/60 backdrop-blur-md border-blue-500/30 glow-border-supernova">
        <CardHeader>
          <CardTitle className="text-blue-400 font-orbitron flex items-center">
            <Globe className="mr-2" />
            Planetary Life Potential Comparison
          </CardTitle>
          <CardDescription className="text-blue-200">
            Compare life potential across different planetary bodies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {planetaryData.map((planet) => (
              <Card 
                key={planet.id} 
                className={`bg-gray-700/80 backdrop-blur-sm border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedPlanet.id === planet.id ? 'border-blue-400 scale-105' : 'border-gray-600'
                }`}
                onClick={() => handlePlanetChange(planet.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    {planet.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-400">
                    {planet.type} • {planet.distanceFromSun} AU
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-300">Life Potential</span>
                      <span className={`text-sm font-bold ${getLifePotentialColor(planet.lifePotential.score)}`}>
                        {getLifePotentialLabel(planet.lifePotential.score)}
                      </span>
                    </div>
                    <Progress value={planet.lifePotential.score} className="h-2" />
                    <span className="text-xs text-gray-400">{planet.lifePotential.score}/100</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-xs text-gray-300">
                      <Droplets className="mr-1 h-3 w-3" />
                      Water: {planet.water.percentage}% ({planet.water.state})
                    </div>
                    <div className="flex items-center text-xs text-gray-300">
                      <Wind className="mr-1 h-3 w-3" />
                      Atmosphere: {planet.atmosphere.pressure} atm
                    </div>
                    <div className="flex items-center text-xs text-gray-300">
                      <Mountain className="mr-1 h-3 w-3" />
                      Temp: {planet.atmosphere.temperature}°C
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    {planet.evolution.currentStage}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSimulation = () => (
    <div className="space-y-6">
      <Card className="bg-gray-800/60 backdrop-blur-md border-blue-500/30 glow-border-supernova">
        <CardHeader>
          <CardTitle className="text-blue-400 font-orbitron flex items-center">
            <Zap className="mr-2" />
            Real-Time Evolution Simulation
          </CardTitle>
          <CardDescription className="text-blue-200">
            Watch {selectedPlanet.name}'s evolution unfold in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Simulation Controls */}
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            
            <Button 
              onClick={resetSimulation}
              variant="outline"
              className="border-blue-500 text-blue-300 hover:bg-blue-500/20"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-300">Speed:</span>
              <Slider
                value={[simulationSpeed]}
                onValueChange={(value) => setSimulationSpeed(value[0])}
                max={500}
                min={50}
                step={50}
                className="w-32"
              />
              <span className="text-sm text-blue-300">{simulationSpeed}ms</span>
            </div>
          </div>

          {/* Time Display */}
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 font-orbitron">
              {simulationTime.toFixed(1)} Billion Years Ago
            </div>
            <div className="text-sm text-gray-400">
              {simulationTime === 0 ? 'Present Day' : simulationTime > 4.6 ? 'Before Formation' : ''}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-300">
              <span>Formation</span>
              <span>Present</span>
            </div>
            <Progress value={(simulationTime / 4.6) * 100} className="h-3" />
          </div>

          {/* Current Event Display */}
          {selectedEvent && (
            <Card className="bg-gray-700/80 backdrop-blur-sm border-l-4 border-blue-500">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <Badge className={`${getEventColor(selectedEvent.category)} text-white`}>
                    {selectedEvent.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {selectedEvent.significance}
                  </Badge>
                </div>
                <CardTitle className="text-white">{selectedEvent.event}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{selectedEvent.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Planet State Visualization */}
          <Card className="bg-gray-700/80 backdrop-blur-sm border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="mr-2" />
                {selectedPlanet.name} State at {simulationTime.toFixed(1)} Ga
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {simulationTime > 4.6 ? 'N/A' : simulationTime < 0.1 ? 'Modern' : 'Ancient'}
                  </div>
                  <div className="text-xs text-gray-400">Era</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">
                    {selectedPlanet.atmosphere.temperature}°C
                  </div>
                  <div className="text-xs text-gray-400">Temperature</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {selectedPlanet.water.percentage}%
                  </div>
                  <div className="text-xs text-gray-400">Water</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getLifePotentialColor(selectedPlanet.lifePotential.score)}`}>
                    {selectedPlanet.lifePotential.score}
                  </div>
                  <div className="text-xs text-gray-400">Life Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      {/* Background Effects */}
      <div className="cosmic-bg"></div>
      <div className="cosmic-stars" id="cosmic-stars"></div>
      <div className="cosmic-nebula"></div>
      <div className="cosmic-grid"></div>
      <div id="cosmic-particles"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="relative bg-black/20 backdrop-blur-sm border-b border-blue-500/30 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center glow-border-supernova">
                <Dna className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent font-orbitron">
                  Planetary Life Evolution Dashboard
                </h1>
                <p className="text-sm text-gray-300">Interactive exploration of life potential across the cosmos</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Select value={selectedPlanet.id} onValueChange={handlePlanetChange}>
                <SelectTrigger className="w-48 bg-gray-800/60 border-blue-500/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800/90 border-blue-500/50">
                  {planetaryData.map(planet => (
                    <SelectItem key={planet.id} value={planet.id}>
                      {planet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-6">
          {/* Planet Overview */}
          <Card className="bg-gray-800/60 backdrop-blur-md border-blue-500/30 glow-border-supernova mb-6">
            <CardHeader>
              <CardTitle className="text-blue-400 font-orbitron flex items-center">
                <Globe className="mr-2" />
                {selectedPlanet.name} Overview
              </CardTitle>
              <CardDescription className="text-blue-200">
                {selectedPlanet.type} planet at {selectedPlanet.distanceFromSun} AU from its star
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">
                    {selectedPlanet.lifePotential.score}
                  </div>
                  <div className="text-sm text-gray-400">Life Potential</div>
                  <div className={`text-xs font-semibold ${getLifePotentialColor(selectedPlanet.lifePotential.score)}`}>
                    {getLifePotentialLabel(selectedPlanet.lifePotential.score)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">
                    {selectedPlanet.water.percentage}%
                  </div>
                  <div className="text-sm text-gray-400">Water Coverage</div>
                  <div className="text-xs text-gray-500">{selectedPlanet.water.state}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">
                    {selectedPlanet.atmosphere.temperature}°C
                  </div>
                  <div className="text-sm text-gray-400">Temperature</div>
                  <div className="text-xs text-gray-500">{selectedPlanet.atmosphere.pressure} atm</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">
                    {selectedPlanet.lifePotential.timeline.length}
                  </div>
                  <div className="text-sm text-gray-400">Key Events</div>
                  <div className="text-xs text-gray-500">In planetary history</div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">Life Potential Factors</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPlanet.lifePotential.factors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-blue-500 text-blue-300">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">Evolution Stage</h4>
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                    {selectedPlanet.evolution.currentStage}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* View Tabs */}
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/60 backdrop-blur-md glow-border-supernova">
              <TabsTrigger value="timeline" className="cosmic-tab data-[state=active]:bg-blue-600 font-orbitron">
                <Clock className="mr-2" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="comparison" className="cosmic-tab data-[state=active]:bg-sky-600 font-orbitron">
                <Globe className="mr-2" />
                Comparison
              </TabsTrigger>
              <TabsTrigger value="simulation" className="cosmic-tab data-[state=active]:bg-cyan-600 font-orbitron">
                <Zap className="mr-2" />
                Simulation
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              {viewMode === 'timeline' && renderTimeline()}
              {viewMode === 'comparison' && renderComparison()}
              {viewMode === 'simulation' && renderSimulation()}
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  )
}