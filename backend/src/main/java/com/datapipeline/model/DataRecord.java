package com.datapipeline.model;

public class DataRecord {
    private String id;
    private String source;
    private String destination;
    private String status;
    private Long timestamp;
    
    // Constructors
    public DataRecord() {}
    
    public DataRecord(String id, String source, String destination, String status) {
        this.id = id;
        this.source = source;
        this.destination = destination;
        this.status = status;
        this.timestamp = System.currentTimeMillis();
    }
    
    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public Long getTimestamp() { return timestamp; }
    public void setTimestamp(Long timestamp) { this.timestamp = timestamp; }
}