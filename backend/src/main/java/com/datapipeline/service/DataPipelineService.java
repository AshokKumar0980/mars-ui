package com.datapipeline.service;

import com.datapipeline.model.DataRecord;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class DataPipelineService {
    
    private final Map dataStore = new ConcurrentHashMap<>();
    
    public DataRecord createPipeline(DataRecord record) {
        record.setId(UUID.randomUUID().toString());
        record.setTimestamp(System.currentTimeMillis());
        record.setStatus("CREATED");
        dataStore.put(record.getId(), record);
        return record;
    }
    
    public List getAllPipelines() {
        return new ArrayList<>(dataStore.values());
    }
    
    public DataRecord getPipeline(String id) {
        return dataStore.get(id);
    }
    
    public DataRecord updatePipeline(String id, DataRecord record) {
        if (dataStore.containsKey(id)) {
            record.setId(id);
            record.setTimestamp(System.currentTimeMillis());
            dataStore.put(id, record);
            return record;
        }
        return null;
    }
    
    public boolean deletePipeline(String id) {
        return dataStore.remove(id) != null;
    }
    
    public DataRecord executePipeline(String id) {
        DataRecord record = dataStore.get(id);
        if (record != null) {
            record.setStatus("RUNNING");
            // Simulate pipeline execution
            try {
                Thread.sleep(2000);
                record.setStatus("COMPLETED");
            } catch (InterruptedException e) {
                record.setStatus("FAILED");
            }
            dataStore.put(id, record);
        }
        return record;
    }
}