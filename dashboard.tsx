"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Users, Clock, Timer, Camera } from "lucide-react"
import FaceDetection from "./components/camera/FaceDetection"
import { useState } from "react"
import { Switch } from "./components/ui/switch"

export default function FaceMonitorDashboard() {
  const [isOn, setIsOn] = useState(false)
  const handleChangeSwitch = () => setIsOn(!isOn)
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Face Monitor Dashboard</h1>
          <p className="text-gray-600">Real-time facial recognition monitoring system</p>
        </div>

        {/* Video Feed Section */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Live Camera Feed
              <Switch checked={isOn} onCheckedChange={handleChangeSwitch} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className={`text-center ${isOn ? 'h-full' : ''}`}>
                {isOn ? <FaceDetection /> : <>
                  <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">Webcam Video Feed</p>
                  <p className="text-gray-400 text-sm">Camera stream will appear here</p>
                </>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total People Detected</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">247</div>
              <p className="text-xs text-gray-500 mt-1">+12% from yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">People Per Hour</CardTitle>
              <Clock className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">18</div>
              <p className="text-xs text-gray-500 mt-1">Current hour average</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Last Detection Time</CardTitle>
              <Timer className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">14:32:15</div>
              <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
            </CardContent>
          </Card>
        </div>

        {/* Graph Section */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Flow of people over time</CardTitle>
            <CardDescription>Real-time visualization of people detection throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-400 rounded"></div>
                </div>
                <p className="text-gray-500 text-lg font-medium">Graph Placeholder</p>
                <p className="text-gray-400 text-sm">Flow of people over time chart</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Responses Section */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">📌 Respostas Técnicas Obrigatórias</CardTitle>
            <CardDescription>Documentação técnica das implementações do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="distance-calculation" className="text-sm font-medium text-gray-700">
                1. Como calculou a distância do rosto até a câmera?
              </Label>
              <Textarea
                id="distance-calculation"
                placeholder="Descreva o método utilizado para calcular a distância do rosto até a câmera..."
                className="min-h-[100px] resize-none"
                defaultValue=""
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firebase-rule" className="text-sm font-medium text-gray-700">
                2. Qual regra usou para registrar a detecção no Firebase?
              </Label>
              <Textarea
                id="firebase-rule"
                placeholder="Explique a regra implementada para registrar detecções no Firebase..."
                className="min-h-[100px] resize-none"
                defaultValue=""
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duplicate-prevention" className="text-sm font-medium text-gray-700">
                3. Como evitou contagem duplicada de rostos? (se aplicável)
              </Label>
              <Textarea
                id="duplicate-prevention"
                placeholder="Descreva o método utilizado para evitar contagem duplicada de rostos..."
                className="min-h-[100px] resize-none"
                defaultValue=""
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
