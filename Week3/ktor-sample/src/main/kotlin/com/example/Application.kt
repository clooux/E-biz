package com.example

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.example.plugins.*
import dev.kord.common.entity.Snowflake
import dev.kord.core.Kord
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

@Serializable
data class Product(val name: String, val category: String)

suspend fun main() {
    val kord = Kord("MTA5NTgwNTU0OTM0MzQyODYxMg.GrhGSm.gRJ4cKPQe5SMX3XXp4WusjZwzG8VFvoWntIttQ")
    val channelId = "1095804540919500813"
    val categories = listOf("books", "hardware", "software")
    val products =
        listOf(Product("kotlin book", "books"), Product("Raspberry Pi", "hardware"), Product("intelliJ", "software"))

    kord.on<MessageCreateEvent> { // runs every time a message is created that our bot can read

        // ignore other bots, even ourselves. We only serve humans here!
        if (message.author?.isBot != false) return@on

        // check if our command is being invoked
        if (message.content.startsWith('!')) {
            val command = message.content.substringAfter('!')

            if (command == "categories") {
                message.channel.createMessage(Json.encodeToString(categories))
            }

            if (command == "ping") {
                message.channel.createMessage("pong!")
            }

            if (categories.contains(command)) {
                message.channel.createMessage(Json.encodeToString(products.filter { it.category == command }))
            }
        }

        message.channel.createMessage("Thank you for message ${message.author?.tag}")

    }

    embeddedServer(Netty, port = 8080) {
        restMessageSender(kord, channelId);
    }.start(wait = false)

    kord.login {
        // we need to specify this to receive the content of messages
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }

}

fun Application.restMessageSender(kord: Kord, channelId: String) {
    routing {
        post("/a") {
            val message = call.receive<String>()
            kord.rest.channel.createMessage(Snowflake(channelId)) {
                content = message
            }
            call.respond("Message was sent to channel ogólny on ObiektowySerwer")
        }
    }
}

fun Application.module() {
    configureSerialization()
    configureSockets()
    configureRouting()
}
