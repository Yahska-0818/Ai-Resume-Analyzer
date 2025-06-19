"use client"

import { useState } from "react"

interface AnalysisResult {
  missingKeywords: string[]
  suggestions: string[]
  matchScore: number
}

export default function SimpleResumeOptimizer() {
  const [resume, setResume] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeResume = async () => {
    if (!resume.trim() || !jobDescription.trim()) {
      alert("Please fill in both fields")
      return
    }

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: resume.trim(), jobDescription: jobDescription.trim() }),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const result = await response.json()
      setAnalysis(result)
    } catch (_error) {
      alert("Analysis failed. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Resume Optimizer</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        <div>
          <h3>Your Resume</h3>
          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your resume here..."
            style={{
              width: "100%",
              height: "300px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
        </div>

        <div>
          <h3>Job Description</h3>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description here..."
            style={{
              width: "100%",
              height: "300px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <button
          onClick={analyzeResume}
          disabled={isAnalyzing || !resume.trim() || !jobDescription.trim()}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: isAnalyzing ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isAnalyzing ? "not-allowed" : "pointer",
          }}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {analysis && (
        <div>
          <div
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginBottom: "20px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <h3>Match Score: {analysis.matchScore}%</h3>
          </div>

          <div
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginBottom: "20px",
            }}
          >
            <h3>Missing Keywords</h3>
            {analysis.missingKeywords.length > 0 ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
                {analysis.missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "4px 8px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            ) : (
              <p style={{ color: "green" }}>No missing keywords found!</p>
            )}
          </div>

          <div
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            <h3>Suggestions</h3>
            <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
