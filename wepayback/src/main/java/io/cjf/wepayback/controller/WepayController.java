package io.cjf.wepayback.controller;

import com.alibaba.fastjson.JSONObject;
import io.cjf.wepayback.dto.HandleResultDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/wepay")
public class WepayController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @PostMapping(value = "/handlePayResult", produces = MediaType.APPLICATION_XML_VALUE)
    public HandleResultDTO handlePayResult(@RequestBody JSONObject payResult){
        logger.info("pay result: {}", payResult);

        HandleResultDTO handleResultDTO = new HandleResultDTO();
        handleResultDTO.setReturn_code("SUCCESS");
        handleResultDTO.setReturn_msg("OK");
        return handleResultDTO;
    }
}
