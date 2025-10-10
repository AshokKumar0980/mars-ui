package main.java.com.datapipeline.controller;

import main.java.com.datapipeline.model.DataRecord;
import main.java.com.datapipeline.service.DataPipelineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pipelines")
public class DataController {
    
    @Autowired
    private DataPipelineService pipelineService;
    
    @PostMapping
    public ResponseEntity createPipeline(@RequestBody DataRecord record) {
        DataRecord created = pipelineService.createPipeline(record);
        return ResponseEntity.ok(created);
    }
    
    @GetMapping
    public ResponseEntity<List> getAllPipelines() {
        return ResponseEntity.ok(pipelineService.getAllPipelines());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity getPipeline(@PathVariable String id) {
        DataRecord record = pipelineService.getPipeline(id);
        return record != null ? ResponseEntity.ok(record) : ResponseEntity.notFound().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity updatePipeline(@PathVariable String id, @RequestBody DataRecord record) {
        DataRecord updated = pipelineService.updatePipeline(id, record);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity deletePipeline(@PathVariable String id) {
        boolean deleted = pipelineService.deletePipeline(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
    
    @PostMapping("/{id}/execute")
    public ResponseEntity executePipeline(@PathVariable String id) {
        DataRecord executed = pipelineService.executePipeline(id);
        return executed != null ? ResponseEntity.ok(executed) : ResponseEntity.notFound().build();
    }
}